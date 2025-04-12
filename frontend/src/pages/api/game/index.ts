// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Game from '../../../api/game';
import { createGame } from "@/api/database";

type Data = {
  uuid: string;
  latestEp: number;
};

export const games = new Map<string, Game>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    let game;
    if(typeof(req.query?.seed) == 'string'){
      game = new Game(req.query.seed);
    } else {
      game = new Game();
    }
    
    games.set(game.uuid, game);
    await createGame(game)
    res.status(200).json({
      uuid: game.uuid,
      latestEp: game.seed.latest_ep,
    });
    
  } else {
    res.status(405);
  }
  
}
