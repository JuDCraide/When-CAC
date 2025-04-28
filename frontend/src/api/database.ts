import { ObjectId } from 'mongodb';
import Game from './game';
import fs from 'fs';
import path from 'path';
import { calculatePointsDate, calculatePointsEps } from './points';
import dayjs from 'dayjs';

import { MongoClient, Db } from "mongodb";

if (!process.env.DB_CONN_STRING) {
    throw new Error('DB_CONN_STRING must be defined');
}

const uri = process.env.DB_CONN_STRING!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

async function getDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db('WhenCAC');
}

export interface GuessVideo {
    formatted_title: string,
    image_url: string
    video_id: string,
}

export interface VideoResponse {
    title: string,
    ep: number,
    video_id: string,
    date: string
}

export interface ResultResponse {
    responseVideo: VideoResponse
    points: {
        ep: number,
        date: number,
    }
}

export interface View {
    hash: string,
    date: Date
}

// interface Video {
//     title: string,
//     formatted_title: string,
//     ep: number,
//     video_id: string,
//     date: string
// }

export async function createGame(game: Game) {
    const db = await getDb();
    const result = await db.collection<Game>('games').insertOne(game);
    return result.insertedId;
}

async function getGameById(id: string) {
    const db = await getDb();
    return db.collection<Game>('games').findOne({ _id: new ObjectId(id) });
}

async function saveCompletedGame(id: string) {
    const game = await getGameById(id);
    if (game) {
        const db = await getDb();
        db.collection<Game>('completed_games').insertOne(game);
    }
}

async function updateGamePoints(id: string, epPoints: number[], datePoints: number[]) {
    const db = await getDb();
    await db.collection('games').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ep_points: epPoints, date_points: datePoints } }
    );
    saveCompletedGame(id);
}

async function getGuessVideoByEp(ep: number) {
    const db = await getDb();
    const video = await db.collection<GuessVideo>('videos').findOne({ ep });
    if (!video) return null;

    return {
        formatted_title: video.formatted_title,
        video_id: video.video_id,
        image_url: getImageAsBase64(`${video.video_id}.jpg`)
    };
}

async function getVideoResponseByEp(ep: number) {
    const db = await getDb();
    return db.collection<VideoResponse>('videos').findOne({ ep });
}

async function getGuessVideo(uuid: string, round: number) {
    const game = await getGameById(uuid);
    if (!game) {
        return null;
    }
    return await getGuessVideoByEp(game.episodes[round - 1]);
}

async function getResponseVideo(uuid: string, round: number, epGuess: number, dateGuess: string) {
    const game = await getGameById(uuid);
    let response = null;
    if (game) {
        const video = await getVideoResponseByEp(game.episodes[round - 1]);
        if (video) {
            const pointsEp = calculatePointsEps(video.ep, epGuess)
            const pointsDate = calculatePointsDate(dayjs(video.date), dayjs(dateGuess))
            game.ep_points[round - 1] = pointsEp
            game.date_points[round - 1] = pointsDate
            await updateGamePoints(uuid, game.ep_points, game.date_points);
            response = {
                responseVideo: {
                    title: video.title,
                    ep: video.ep,
                    video_id: video.video_id,
                    date: video.date
                },
                points: {
                    ep: pointsEp,
                    date: pointsDate,
                }
            };

        }
    }

    return response;
}

async function updateViews(view: View) {
    const db = await getDb();
    const viewsCollection = db.collection<View>('views');

    const twentyFourHoursAgo = dayjs().subtract(24, 'hours').toDate();
    const recentView = await viewsCollection.findOne({ hash: view.hash, date: { $gte: twentyFourHoursAgo } });

    if (!recentView) {
        await viewsCollection.insertOne(view);
        return true;
    }

    return false;
}

export function getImageAsBase64(relativePath: string): string {
    const filePath = path.join(process.cwd(), 'thumbnails/', relativePath);
    const fileData = fs.readFileSync(filePath);
    return `data:image/${path.extname(filePath).slice(1)};base64,${fileData.toString('base64')}`;
}

export { getGuessVideo, getResponseVideo, updateViews };