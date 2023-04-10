import { SupabaseClient } from "@supabase/supabase-js";

export const addPortfolioItem = async (
  portfolioItem: {
    thumbUrl: string;
    translations: {
      localeId: string;
      title: string;
      description: string;
    }[];
  },
  supabaseClient: SupabaseClient
): Promise<void> => {
  try {
    const { data: portolioItemResult, error: portfolioItemError } =
      await supabaseClient
        .from("portfolioItems")
        .insert({
          thumbUrl: portfolioItem.thumbUrl,
        })
        .select();

    if (portfolioItemError) {
      throw portfolioItemError;
    }

    const { error: translationsError } = await supabaseClient
      .from("translations")
      .insert(
        portfolioItem.translations.map((translation) => ({
          ...translation,
          portfolioItemId: portolioItemResult[0].id,
        }))
      );

    if (translationsError) {
      throw translationsError;
    }
  } catch (error) {
    console.error(error);
  }
};
