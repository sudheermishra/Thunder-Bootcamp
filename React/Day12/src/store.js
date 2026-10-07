import { create } from "zustand";

export const useStore = create((set) => ({
  count: 0,
  user: "sudheer",
  number: 10,
  setUser: () => {
    set({ user: "Mishra" });
  },
  setCount: () => {
    set((state) => ({
      count: state.count + 1,
    }));
  },
  setNumber: (value) => {
    set((state) => ({
      number: state.number + value,
    }));
  },
}));
