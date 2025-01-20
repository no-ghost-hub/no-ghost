import { useCartStore } from "@/components/providers/Global";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type CartStore = {
  cart: CartItem[];
  add: (item: CartItem) => void;
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

const totalQuantity = () => useCartStore((state) => state.cart.length);

const totalPrice = () =>
  useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

export { totalQuantity, totalPrice };
