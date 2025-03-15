import { useCartStore } from "@/components/providers/Global";
import { createStore } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

export type CartItem = {
  id: string;
  productId: number;
  title: string;
  price: number;
  taxedPrice: number;
  tax: { id: number; amount: number };
  attributes?: { id: number; name: string; price: number }[];
  quantity: number;
  reward?: {
    id: number;
    points: number;
  };
};

export type CartDiscount = {
  code: string;
  minQuantity: number;
  points: number;
  products: number[];
  rewards: {
    id: number;
    product: number;
    maxQuantity: number;
    points: number;
    rewardProduct: {
      id: number;
      title: string;
    };
  }[];
};

export type CartStore = {
  cart: CartItem[];
  add: (item: Omit<CartItem, "id">) => void;
  update: (id: string, quantity: number) => void;
  removeAttribute: (id: string, attributeId: number) => void;
  clear: () => void;
  discount: CartDiscount | undefined;
  setDiscount: (discount: any) => void;
  applyDiscount: () => void;
};

const uniqueId = (id: number, attributes: { id: number }[] = []) =>
  `${id}${attributes.length ? attributes.reduce((string, { id }) => `${string}-${id}`, "") : ""}`;

export const attributesPrice = (attributes?: { price: number }[]) =>
  attributes?.reduce((sum, { price }) => sum + price, 0) || 0;

export const createCartStore = () => {
  const store = createStore<CartStore>()(
    subscribeWithSelector(
      persist(
        (set) => ({
          cart: [],
          add: (item) =>
            set((state) => ({
              cart: [
                ...state.cart,
                {
                  id: uniqueId(item.productId, item.attributes),
                  ...item,
                },
              ],
            })),
          update: (id, quantity) =>
            set((state) => ({
              cart:
                quantity > 0
                  ? state.cart.map((item) =>
                      item.id === id ? { ...item, quantity } : item,
                    )
                  : state.cart.filter((item) => item.id !== id),
            })),
          removeAttribute: (id, attributeId) =>
            set((state) => ({
              cart: state.cart.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      attributes: item.attributes?.filter(
                        ({ id }) => id !== attributeId,
                      ),
                    }
                  : item,
              ),
            })),
          clear: () => set({ cart: [], discount: undefined }),
          discount: undefined,
          setDiscount: (discount) =>
            set((state) => {
              if (!discount) {
                return {
                  cart: state.cart.filter(({ reward }) => !reward),
                  discount,
                };
              }
              return { discount };
            }),
          applyDiscount: () =>
            set((state) => {
              if (!state.discount) return {};
              state.cart = state.cart.filter(({ reward }) => !reward);

              const { minQuantity, points, products, rewards } = state.discount;

              const validProducts = state.cart.filter(({ productId }) =>
                products.includes(productId),
              );

              if (validProducts.length < minQuantity) return {};

              let remainingPoints = points;

              rewards.forEach(
                ({ id, product, maxQuantity, points, rewardProduct }) => {
                  state.cart.forEach((item) => {
                    if (
                      product === item.productId &&
                      remainingPoints >= points
                    ) {
                      const quantity = Math.min(
                        item.quantity,
                        maxQuantity,
                        Math.floor(remainingPoints / points),
                      );

                      if (quantity > 0) {
                        state.add({
                          productId: rewardProduct.id,
                          price: -item.price * quantity,
                          taxedPrice: -item.taxedPrice * quantity,
                          quantity,
                          tax: item.tax,
                          title: rewardProduct.title,
                          reward: {
                            id,
                            points,
                          },
                        });

                        remainingPoints -= points;
                      }
                    }
                  });
                },
              );

              return {};
            }),
        }),
        {
          name: "cart-storage",
          storage: createJSONStorage(() => localStorage),
        },
      ),
    ),
  );

  store.subscribe(
    (state) => state.cart,
    (nv, ov) => {
      const oldQuantity = calcTotalQuantity(ov);
      const newQuantity = calcTotalQuantity(nv);

      if (oldQuantity !== newQuantity) {
        store.getState().applyDiscount();
      }
    },
    {
      fireImmediately: false,
    },
  );

  return store;
};

const productQuantity = (id: number) =>
  useCartStore((state) =>
    state.cart.reduce(
      (acc, { productId, quantity }) =>
        productId === id ? acc + quantity : acc,
      0,
    ),
  );

const calcTotalQuantity = (items: CartItem[]) =>
  items
    .filter(({ reward }) => !reward)
    .reduce((acc, { quantity }) => acc + quantity, 0);

const totalQuantity = () =>
  useCartStore((state) => calcTotalQuantity(state.cart));

const totalPrice = () =>
  useCartStore((state) =>
    state.cart.reduce(
      (acc, { taxedPrice, attributes, tax, quantity }) =>
        acc +
        (taxedPrice + attributesPrice(attributes) * (1 + tax.amount / 100)) *
          quantity,
      0,
    ),
  );

export { totalQuantity, totalPrice, productQuantity };
