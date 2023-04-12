export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          displayOrder: number;
          id: number;
          imageUrl: string;
          portfolioItemId: number;
        };
        Insert: {
          displayOrder?: number;
          id?: number;
          imageUrl: string;
          portfolioItemId: number;
        };
        Update: {
          displayOrder?: number;
          id?: number;
          imageUrl?: string;
          portfolioItemId?: number;
        };
      };
      portfolioItems: {
        Row: {
          displayOrder: number;
          id: number;
        };
        Insert: {
          displayOrder?: number;
          id?: number;
        };
        Update: {
          displayOrder?: number;
          id?: number;
        };
      };
      translations: {
        Row: {
          description: string;
          localeId: string;
          portfolioItemId: number;
          title: string;
        };
        Insert: {
          description: string;
          localeId: string;
          portfolioItemId: number;
          title: string;
        };
        Update: {
          description?: string;
          localeId?: string;
          portfolioItemId?: number;
          title?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_portfolio_item: {
        Args: {
          id: number;
          locale_id: string;
        };
        Returns: {
          id: string;
          title: string;
          description: string;
        }[];
      };
      get_portfolio_items: {
        Args: {
          locale_id: string;
        };
        Returns: {
          id: string;
          title: string;
          thumbUrl: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
