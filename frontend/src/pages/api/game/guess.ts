import type { NextApiRequest, NextApiResponse } from "next";
import { getGuessVideo, GuessVideo } from '../../../api/database';
import { APIError } from "./index";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GuessVideo | APIError>,
) {
	if (req.method === 'GET') {
		console.log(typeof (req.query?.round))
		if (typeof (req.query?.uuid) == 'string' && typeof (req.query?.round) == 'string') {
			const round = Number(req.query?.round);
			const guessVideo = await getGuessVideo(req.query.uuid, round);
			if (guessVideo)
				res.status(200).json(guessVideo);
			else
				res.status(404).json({ message: "Not Found" });
		} else {
			res.status(400).json({ message: "Bad Request" });
		}
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
