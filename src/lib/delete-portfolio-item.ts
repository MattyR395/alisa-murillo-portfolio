import { SupabaseClient } from "@supabase/auth-helpers-react";

export const deletePortfolioItem = async (
  id: number,
  supabaseClient: SupabaseClient
): Promise<void> => {
  try {
    const { error } = await supabaseClient
      .from("portfolioItems")
      .delete()
      .match({ id });

    if (error) {
      throw error.message;
    }
  } catch (error) {
    console.error(error);
  }
};
