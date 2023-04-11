import { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

/**
 * Uploads an array of files to the `images` bucket in Supabase.
 * 
 * @param files An Array of files to upload.
 * @param supabaseClient Supabase client to use for the upload.

 * @returns An object containing: 
 *   - `paths` - An array of paths to for uploaded files.
 *   - `errors` - An array of any errors that occurred during the upload.
 */
export const uploadFiles = async (
  files: File[],
  supabaseClient: SupabaseClient
): Promise<{
  paths: string[];
  errors: any[];
}> => {
  const errors = [];
  const uploadData = [];

  for (const file of files) {
    const name = uuidv4();

    const { data, error } = await supabaseClient.storage
      .from("images")
      .upload(`public/${name}`, file);

    if (data) {
      uploadData.push(data);
    }

    if (error) {
      errors.push(error);
    }
  }

  return {
    paths: uploadData.map((data) => data.path),
    errors,
  };
};

/**
 * Takes an array of paths and inserts them into the images table.
 * `displayOrder` will correspond to order of the `paths` array.
 *
 * @param portfolioItemId ID of the portfolio item to associate the images with.
 * @param paths Array of paths to insert into the images table.
 * @param supabaseClient Supabase client use for the insert.
 */
export const insertFilePaths = async (
  portfolioItemId: number,
  paths: string[],
  supabaseClient: SupabaseClient
): Promise<void> => {
  const {
    data: { publicUrl },
  } = supabaseClient.storage.from("images").getPublicUrl("");

  const { error } = await supabaseClient.from("images").insert(
    paths.map((path, i) => ({
      portfolioItemId,
      displayOrder: i,
      imageUrl: `${publicUrl}${path}`,
    }))
  );

  if (error) {
    throw error;
  }
};
