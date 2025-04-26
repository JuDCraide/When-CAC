import type { NextApiRequest, NextApiResponse } from "next";
import { LATEST_EP } from "@/api/seed";
import { APIError } from "./index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number | APIError>,
) {
  if (req.method === 'GET') {
    return res.status(200).json(LATEST_EP);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
