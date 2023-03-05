import { create } from "zustand";

type TThemeStore = {
  theme: "dark" | "light";
  setTheme: () => void;
};

export const useThemeStore = create<TThemeStore>((set) => ({
  theme: "dark",

  setTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));
