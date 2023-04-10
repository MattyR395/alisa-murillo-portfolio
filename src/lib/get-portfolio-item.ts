import { AdminPortfolioItem } from "@/models/admin-portfolio-item";
import { SupabaseClient } from "@supabase/supabase-js";

export const getAdminPortfolioItem = async (
  id: number,
  localeId: string,
  supabaseClient: SupabaseClient
): Promise<AdminPortfolioItem | undefined> => {
  try {
    const { data, error } = await supabaseClient
      .rpc("get_portfolio_item", {
        id,
        locale_id: localeId,
      })
      .select("id, title");

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error(error);
  }
};
