import { createStore } from "zustand/vanilla";

export type UiStore = {
  navigation: string;
  setNavigation: (s: string) => void;
};

export const createUiStore = (initial: string) =>
  createStore<UiStore>()((set) => ({
    navigation: initial,
    setNavigation: (s) => set((state) => ({ navigation: s })),
  }));
