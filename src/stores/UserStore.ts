import { create } from "zustand";

type TUserStore = {
  username: string;
  setUsername: (username: string) => void;
  clearUsername: () => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  username: "",

  setUsername: (username: string) => {
    set({
      username,
    });
  },

  clearUsername: () => {
    set({
      username: "",
    });
  },
}));
