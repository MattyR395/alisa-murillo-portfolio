import { BAD_REQUEST, METHOD_NOT_ALLOWED } from "@/constants/api-responses";
import { authSupabaseServerClient } from "@/lib/auth-supabase-server-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { portfolioItemId } = req.query;

    if (!portfolioItemId || typeof portfolioItemId !== "string") {
      res.status(400).json(BAD_REQUEST);
      return;
    }

    const supabaseClient = await authSupabaseServerClient(req, res);

    const { data: images, error: imagesError } = await supabaseClient
      .from("images")
      .select("imageUrl")
      .eq("portfolioItemId", portfolioItemId);

    if (imagesError) {
      res.status(500).json(imagesError);
      return;
    }

    try {
      if (images) {
        const {
          data: { publicUrl },
        } = supabaseClient.storage.from("images").getPublicUrl("");

        await deleteBucketFiles(
          images.map((image) => {
            console.log("i", image.imageUrl);
            console.log("m", publicUrl);

            return image.imageUrl.replace(publicUrl, "");
          }),
          supabaseClient
        );
      }

      await deletePortfolioItem(portfolioItemId, supabaseClient);
    } catch (error) {
      res.status(500).json(error);
    }

    await deletePortfolioItem(portfolioItemId, supabaseClient);

    res.status(200).json({ message: "Portfolio item deleted" });
  } else {
    res.status(405).json(METHOD_NOT_ALLOWED);
  }
}

const deleteBucketFiles = async (
  imagePaths: string[],
  supabaseClient: SupabaseClient
): Promise<void> => {
  const { error } = await supabaseClient.storage
    .from("images")
    .remove(imagePaths);

  if (error) {
    throw error;
  }
};

const deletePortfolioItem = async (
  id: string,
  supabaseClient: SupabaseClient
): Promise<void> => {
  const { error } = await supabaseClient
    .from("portfolioItems")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
};
