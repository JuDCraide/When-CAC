// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getResponseVideo, VideoResponse } from '../../../api/database';

class VideoResponseReq {
	uuid: string = "";
	round: number = 1;
	ep: number = 1;
	date: string = "";
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<VideoResponse | null>,
) {
	if (req.method === 'POST') {
		console.log(typeof (req.query?.round))
		if (req.body != null && isVideoResponseReq(req.body)) {
			const responseVideo = await getResponseVideo(req.body.uuid, req.body.round, req.body.ep, req.body.date);
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

const isVideoResponseReq = (value: object): value is VideoResponseReq => {
	//const keys = Object.keys(value)
	const requiredKeys = Object.keys(VideoResponseReq)

	if (typeof value !== 'object' || value === null)
		return false;

	return (
		requiredKeys.every(key => key in value)                              //  Ensure all required keys are present
		//&& (Object.keys(value) as (keyof VideoResponseReq)[]).every(key => keys.includes(key))    //  Ensure no undefined keys are present
	);
}