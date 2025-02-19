"use client";

import { useRef, useContext, createContext } from "react";
import { createUiStore, UiStore } from "@/stores/ui";
import { createCartStore, CartStore } from "@/stores/cart";
import { StoreApi, useStore } from "zustand";
import { String } from "@/payload-types";

type Props = {
  strings: String["strings"];
  currency: string;
  children?: React.ReactNode;
};

export const Context = createContext<{
  uiStore: StoreApi<UiStore> | null;
  cartStore: StoreApi<CartStore> | null;
  strings: String["strings"];
  currency: string;
}>({ uiStore: null, cartStore: null, strings: [], currency: "" });

export const GlobalProvider = ({ children, strings, currency }: Props) => {
  const uiStoreRef = useRef<StoreApi<UiStore>>(null);
  const cartStoreRef = useRef<StoreApi<CartStore>>(null);

  if (!uiStoreRef.current) {
    uiStoreRef.current = createUiStore("");
  }
  if (!cartStoreRef.current) {
    cartStoreRef.current = createCartStore();
  }

  return (
    <Context.Provider
      value={{
        uiStore: uiStoreRef.current,
        cartStore: cartStoreRef.current,
        strings,
        currency,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUiStore = <T,>(selector: (store: UiStore) => T): T => {
  const context = useContext(Context);
  if (!context.uiStore) {
    throw new Error("useUiStore must be used within a GlobalProvider");
  }
  return useStore(context.uiStore, selector);
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const context = useContext(Context);
  if (!context.cartStore) {
    throw new Error("useCartStore must be used within a GlobalProvider");
  }
  return useStore(context.cartStore, selector);
};
