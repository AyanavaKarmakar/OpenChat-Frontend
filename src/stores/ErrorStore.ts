import { create } from "zustand";

type TErrorStore = {
  isError: boolean;
  message: string;
  setError: () => void;
  clearError: () => void;
};

export const useErrorStore = create<TErrorStore>((set) => ({
  isError: false,
  message: "",

  setError: () => {
    set({
      isError: true,
      message: "Something went wrong. Please try again!",
    });

    const timer = setTimeout(() => {
      set({
        isError: false,
        message: "",
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  },

  clearError: () =>
    set({
      isError: false,
      message: "",
    }),
}));
