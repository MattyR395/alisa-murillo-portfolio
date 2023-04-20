import { SupabaseClient } from "@supabase/supabase-js";
import Resizer from "react-image-file-resizer";
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
export const uploadFile = async (
  file: File,
  supabaseClient: SupabaseClient
): Promise<string> => {
  const name = uuidv4();

  const { data, error } = await supabaseClient.storage
    .from("images")
    .upload(`public/${name}`, file);

  if (error) {
    throw error;
  }

  if (data) {
    return data.path;
  }

  throw new Error("No data returned from upload");
};

/**
 * Takes an array of paths and inserts them into the images table.
 * `displayOrder` will correspond to order of the `paths` array.
 *
 * @param portfolioItemId ID of the portfolio item to associate the images with.
 * @param paths Array of paths to insert into the images table.
 * @param supabaseClient Supabase client use for the insert.
 */
export const insertFilePath = async (
  portfolioItemId: number,
  path: string,
  supabaseClient: SupabaseClient,
  dimensions: {
    width: number;
    height: number;
  },
  displayOrder: number = 0
): Promise<void> => {
  const {
    data: { publicUrl: imageUrl },
  } = supabaseClient.storage.from("images").getPublicUrl(path);

  const { error } = await supabaseClient.from("images").insert({
    portfolioItemId,
    displayOrder,
    imageUrl,
    widthPx: dimensions.width,
    heightPx: dimensions.height,
  });

  if (error) {
    throw error;
  }
};

export const resizeFile = (file: File): Promise<File> => {
  const maxWidth: number = 2000;
  const maxHeight: number = 3000;
  const format = "WEBP";
  const quality: number = 90;

  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      format,
      quality,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });
};

export const getImageHeightAndWidth = (
  file: File
): Promise<{
  height: number;
  width: number;
}> =>
  new Promise((resolve) => {
    const dataUrl = window.URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
    img.src = dataUrl;
  });
