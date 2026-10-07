import { create } from "zustand";

export const useStore = create((set) => ({
  count: 0,
  user: "sudheer",
  number: 10,
  userProfile: ["Apple", "orange"],
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
  // new array pass krna padega q ki array refrence ke basis pe compare hota h naa ki value ki basis p
  setUserProfile: (value) => {
    set((state) => ({
      userProfile: [...state.userProfile, value],
    }));
  },
}));
