"use client";

import { useRef, useContext, createContext } from "react";
import { createUiStore, UiStore } from "@/stores/ui";
import { createCartStore, CartStore } from "@/stores/cart";
import { StoreApi, useStore } from "zustand";
import { String } from "@/payload-types";
import { useSearchParams } from "next/navigation";

type Props = {
  strings: String["strings"];
  children?: React.ReactNode;
};

export const Context = createContext<{
  uiStore: StoreApi<UiStore> | null;
  cartStore: StoreApi<CartStore> | null;
  strings: String["strings"];
}>({ uiStore: null, cartStore: null, strings: [] });

export const GlobalProvider = ({ children, strings }: Props) => {
  const uiStoreRef = useRef<StoreApi<UiStore>>(null);
  const cartStoreRef = useRef<StoreApi<CartStore>>(null);

  const searchParams = useSearchParams();

  if (!uiStoreRef.current) {
    uiStoreRef.current = createUiStore(searchParams.get("navigation") || "");
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
