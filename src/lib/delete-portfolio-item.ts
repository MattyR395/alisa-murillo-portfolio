import { SupabaseClient } from "@supabase/auth-helpers-react";
import { errorToast } from "./error-toast";

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
      errorToast(error.message);
      throw error.message;
    }
  } catch (error) {
    console.error(error);
  }
};
