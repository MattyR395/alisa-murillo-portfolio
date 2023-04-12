import { Database } from "@/lib/schema";
import {
  SupabaseClient,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export interface UploadImageRequestBody {
  image: string;
  portfolioItemId: number;
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: UploadImageRequestBody;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "POST") {
    const supabaseServerClient = createServerSupabaseClient<Database>({
      req,
      res,
    });

    const { image, portfolioItemId } = req.body;
    const imageBuffer = Buffer.from(image, "base64");

    try {
      const optimisedImage = await optimiseImage(imageBuffer);
      const path = await uploadImage(optimisedImage, supabaseServerClient);
      await insertFilePath(portfolioItemId, path, 0, supabaseServerClient);
    } catch (error) {
      res.status(500).json(error);
      return;
    }

    res.status(200);
  }

  res.status(405).json({ message: "Method not allowed" });
};

/**
 * Downsizes the image to 1080px wide and converts it to WebP.
 *
 * @param image image to optimise.
 * @returns Newly downsized and converted image.
 */
const optimiseImage = async (image: Buffer): Promise<Buffer> => {
  const data = await sharp(image)
    .resize({
      width: 1080,
      withoutEnlargement: true,
    })
    .toFormat(sharp.format.webp)
    .webp({
      quality: 80,
      force: true,
    })
    .toBuffer();

  return data;
};

/**
 * Uploads an image to the `images` bucket in Supabase.
 *
 * @param image image to upload.
 * @param supabaseClient Supabase client to use for the upload.
 *
 * @returns The path to the uploaded image.
 */
const uploadImage = async (
  image: Buffer,
  supabaseClient: SupabaseClient
): Promise<string> => {
  const imageName = uuidv4();

  const { data, error } = await supabaseClient.storage
    .from("images")
    .upload(`public/${imageName}`, image);

  if (error) {
    throw error;
  }

  if (data) {
    return data.path;
  }

  throw new Error("No data returned from upload.");
};

const insertFilePath = async (
  portfolioItemId: number,
  imagePath: string,
  displayOrder: number,
  supabaseClient: SupabaseClient
) => {
  // Get the full public URL by appending the path to the public URL.
  const {
    data: { publicUrl },
  } = supabaseClient.storage.from("images").getPublicUrl(imagePath);

  const { error } = await supabaseClient.from("images").insert({
    portfolioItemId,
    imageUrl: publicUrl,
    displayOrder,
  });

  if (error) {
    throw error;
  }
};

export default handler;
