import type { NextApiRequest, NextApiResponse } from "next";
import { updateViews, View } from "@/api/database";
import * as crypto from "crypto";
import { APIError } from "../game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIError>,
) {
  if (req.method === 'GET') {
    const ip = req.socket.remoteAddress;
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const date = new Date()
    const view: View = {
      hash,
      date
    }
    const result = await updateViews(view);
    if (result){
      return res.status(200).send({ message: "New view" });
    }
    else{
      return res.status(202).send({ message: "Less than 24h" });
    }   
    
  } else {
    return res.status(405).send({ message: "Method Not Allowed" });
  }
}
