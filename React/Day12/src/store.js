import { create } from "zustand";

export const useStore = create((set) => ({
  count: 0,
  user: "sudheer",
  number: 10,
  setUser: () => {
    set({ user: "Mishra" });
  },
}));
