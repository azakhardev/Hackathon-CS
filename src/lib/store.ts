import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isOpen: false,
}));

const useCommandStore = create((set) => ({
  isOpen: false,
}));
