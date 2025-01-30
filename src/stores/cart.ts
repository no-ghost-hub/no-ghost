import { useCartStore } from "@/components/providers/Global";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  productId: number;
  title: string;
  price: number;
  taxedPrice: number;
  tax: { id: number; amount: number };
  attributes?: { id: number; name: string; price: number }[];
  quantity: number;
};

export type CartStore = {
  cart: CartItem[];
  add: (item: Omit<CartItem, "id">) => void;
  update: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  removeAttribute: (id: string, attributeId: number) => void;
  clear: () => void;
};

export const createCartStore = () =>
  createStore<CartStore>()(
    persist(
      (set) => ({
        cart: [],
        add: (item) =>
          set((state) => ({
            cart: [
              ...state.cart,
              {
                id: `${item.productId}${item.attributes?.length ? item.attributes.reduce((string, { id }) => `${string}-${id}`, "") : ""}`,
                ...item,
                quantity: 1,
              },
            ],
          })),
        update: (id, quantity) =>
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
          })),
        remove: (id) =>
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
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
        clear: () => set({ cart: [] }),
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );

const totalQuantity = () =>
  useCartStore((state) =>
    state.cart.reduce((acc, { quantity }) => acc + quantity, 0),
  );

const totalPrice = () =>
  useCartStore((state) =>
    state.cart.reduce(
      (acc, { taxedPrice, attributes, tax, quantity }) =>
        acc +
        (taxedPrice +
          (attributes?.reduce((sum, { price }) => sum + price, 0) || 0) *
            (1 + tax.amount / 100)) *
          quantity,
      0,
    ),
  );

export { totalQuantity, totalPrice };
