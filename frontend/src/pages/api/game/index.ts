// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Game from '../../../api/game';
import { createGame } from "@/api/database";

type Data = {
  name: string;
};

const games = new Map<string, Game>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Game>,
) {
  if (req.method === 'GET') {
    let game;
    if(typeof(req.query?.seed) == 'string'){
      game = new Game(req.query.seed);
    } else {
      game = new Game();
    }
    
    games.set(game.uuid, game);
    console.log(await createGame(game))
    res.status(200).json(game);
    
  } else {
    res.status(405).json({ name: "Method Not Allowed" });
  }
  
}
