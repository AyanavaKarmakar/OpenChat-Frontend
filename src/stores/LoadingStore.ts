import { create } from "zustand";

type TLoadingStore = {
  isLoading: boolean;
  setLoading: () => void;
  unsetLoading: () => void;
};

export const useLoadingStore = create<TLoadingStore>((set) => ({
  isLoading: false,

  setLoading: () => set({ isLoading: true }),

  unsetLoading: () => set({ isLoading: false }),
}));
