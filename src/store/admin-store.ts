import { AdminAppState } from "@/models/admin-app-state.model";
import { AdminPortfolioItem } from "@/models/admin-portfolio-item";
import { create } from "zustand";

export const useAdminAppStore = create<AdminAppState>((set) => ({
  portfolioItems: {
    items: [],
    isLoading: false,

    setItems: (items: AdminPortfolioItem[]) =>
      set((state) => ({
        portfolioItems: {
          ...state.portfolioItems,
          items,
        },
      })),

    addItem: (item: AdminPortfolioItem) =>
      set((state) => ({
        portfolioItems: {
          ...state.portfolioItems,
          items: [...state.portfolioItems.items, item],
        },
      })),

    deleteItem: (id: number) =>
      set((state) => ({
        portfolioItems: {
          ...state.portfolioItems,
          items: state.portfolioItems.items.filter((item) => item.id !== id),
        },
      })),

    setIsLoading: (isLoading: boolean) =>
      set((state) => ({
        portfolioItems: {
          ...state.portfolioItems,
          isLoading,
        },
      })),
  },
}));
