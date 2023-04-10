import { AdminPortfolioItem } from "./admin-portfolio-item";

export interface AdminAppState {
  portfolioItems: {
    items: AdminPortfolioItem[];
    isLoading: boolean;
    setItems: (items: AdminPortfolioItem[]) => void;
    addItem: (item: AdminPortfolioItem) => void;
    deleteItem: (id: number) => void;
    setIsLoading: (isLoading: boolean) => void;
  };
}
