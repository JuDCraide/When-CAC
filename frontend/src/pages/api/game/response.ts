// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getResponseVideo, VideoResponse } from '../../../api/database';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<VideoResponse | null>,
) {
	if (req.method === 'GET') {
		console.log(typeof (req.query?.round))
		if (typeof (req.query?.uuid) == 'string' && typeof (req.query?.round) == 'string') {
			const round = Number(req.query?.round);
			const responseVideo = await getResponseVideo(req.query.uuid, round);
			if (responseVideo)
				res.status(200).json(responseVideo);
			else
				res.status(404).send(null);
		} else {
			res.status(400).send(null);
		}
	} else {
		res.status(405).send(null);
	}

}
