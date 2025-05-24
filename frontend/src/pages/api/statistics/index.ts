import type { NextApiRequest, NextApiResponse } from "next";
import { updateViews, View } from "@/api/database";
import * as crypto from "crypto";
import { APIError } from "../game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIError>,
) {
  if (req.method === 'GET') {
    //TODO - Cookies
    const allowedOrigins = ['web', 'unity-web', 'unity-windows', 'unity-android'];
    const ip = req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress || '127.0.0.1';
    const { query } = req;
    let origin = 'api';
    if (query && query.origin && typeof query.origin === 'string' && allowedOrigins.includes(query.origin)) {
      origin = query.origin;
    }
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const date = new Date()
    const view: View = {
      hash,
      date,
      origin
    }
    const result = await updateViews(view);
    if (result) {
      return res.status(200).send({ message: "New view" });
    }
    else {
      return res.status(202).send({ message: "Less than 24h" });
    }

  } else {
    return res.status(405).send({ message: "Method Not Allowed" });
  }
}
