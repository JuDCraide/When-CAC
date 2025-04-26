// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Game from '../../../api/game';
import { createGame } from "@/api/database";

export type GameData = {
  uuid: string;
  latestEp: number;
  seed: string;
};

export type APIError = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameData | APIError>,
) {
  if (req.method === 'GET') {
    let game;
    if (typeof (req.query?.seed) == 'string') {
      try {
        game = new Game(req.query.seed);
      } catch (err) {
        if (err !== null && err !== undefined && (err as Error).message) {
          return res.status(400).send({ message: (err as Error).message });
        }
        return res.status(500).send({ message: "Unexpected error" });
      }
    } else {
      game = new Game();
    }

    if (await createGame(game)) {
      return res.status(200).json({
        uuid: game._id.toString(),
        latestEp: game.seed.latest_ep,
        seed: game.seed.encoded_seed,
      });
    }
    return res.status(500).send({ message: "Unexpected error" });
  } else {
    return res.status(405).send({ message: "Method Not Allowed" });
  }
}
