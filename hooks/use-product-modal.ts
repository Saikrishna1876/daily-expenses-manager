import { create } from "zustand";

interface useProductModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProductModal = create<useProductModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
