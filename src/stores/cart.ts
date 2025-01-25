import { useCartStore } from "@/components/providers/Global";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  taxedPrice: number;
  taxId: number;
  attributes?: number[];
  quantity: number;
};

export type CartStore = {
  cart: CartItem[];
  add: (item: CartItem) => void;
  update: (id: number, quantity: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const createCartStore = () =>
  createStore<CartStore>()(
    persist(
      (set) => ({
        cart: [],
        add: (item) =>
          set((state) => ({ cart: [...state.cart, { ...item, quantity: 1 }] })),
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
    state.cart.reduce((acc, item) => acc + item.quantity, 0),
  );

const totalPrice = () =>
  useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.taxedPrice * item.quantity, 0),
  );

export { totalQuantity, totalPrice };
