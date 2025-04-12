import type { NextApiRequest, NextApiResponse } from "next";
import { getGuessVideo, GuessVideo } from '../../../api/database';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GuessVideo | null>,
) {
	if (req.method === 'GET') {
		console.log(typeof (req.query?.round))
		if (typeof (req.query?.uuid) == 'string' && typeof (req.query?.round) == 'string') {
			let round = Number(req.query?.round);
			const guessVideo = await getGuessVideo(req.query.uuid, round);
			if (guessVideo)
				res.status(200).json(guessVideo);
			else
				res.status(404).send(null);
		} else {
			res.status(400).send(null);
		}
	} else {
		res.status(405).send(null);
	}
}
