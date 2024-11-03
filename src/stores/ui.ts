import { create } from "zustand";

type State = {
  strings?: Record<string, string>;
  setStrings: (strings: Record<string, string>) => void;
  s: (key: string) => string;
};

const useUiStore = create<State>((set, get) => ({
  strings: undefined,
  setStrings: (strings: Record<string, string>) => set({ strings }),
  s: (key: string) => get().strings?.[key] || key,
}));

export default useUiStore;
