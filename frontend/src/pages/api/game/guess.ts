// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GuessVideo } from '../../../api/database';
import { games } from './index'

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<GuessVideo>,
) {
	if (req.method === 'GET') {
		if (typeof (req.query?.uuid) == 'string' && typeof (req.query?.number) == 'string') {
			let route = Number(req.query?.number);
			const uuid = req.query?.uuid
			const game = games.get(uuid);
			if (game) {
				const guessVideo = game.get_round(route)
				return res.status(200).json(guessVideo);
			}
			res.status(404);
		} else {
			res.status(400);
		}
	} else {
		res.status(405);
	}

}
