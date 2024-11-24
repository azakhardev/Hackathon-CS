import { create } from "zustand";

type Store = {
  isOpen: boolean;
  toggleShow: () => void;
};

export const useCommandStore = create<Store>((set) => ({
  isOpen: false,
  toggleShow: () => set((state) => ({ isOpen: !state.isOpen })),
}));
