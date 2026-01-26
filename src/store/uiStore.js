// UI state (modals, etc) (Zustand)
import { create } from 'zustand';

export const useUIStore = create((set) => ({
  modals: {},
  openModal: (name) => set((state) => ({
    modals: { ...state.modals, [name]: true },
  })),
  closeModal: (name) => set((state) => ({
    modals: { ...state.modals, [name]: false },
  })),
}));

