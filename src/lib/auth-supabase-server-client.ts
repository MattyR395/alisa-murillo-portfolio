import { UNAUTHORIZED } from "@/constants/api-responses";
import {
  SupabaseClient,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "./schema";

export const authSupabaseServerClient = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<SupabaseClient> => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    res.status(401).json(UNAUTHORIZED);
  }

  return supabaseServerClient;
};
