// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Game from '../../../api/game';
import { createGame } from "@/api/database";

export type GameData = {
  uuid: string;
  latestEp: number;
  seed: string;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameData | null>,
) {
  if (req.method === 'GET') {
    let game;
    if (typeof (req.query?.seed) == 'string') {
      game = new Game(req.query.seed);
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
    res.status(400).send(null);
  } else {
    res.status(405).send(null);
  }

}
