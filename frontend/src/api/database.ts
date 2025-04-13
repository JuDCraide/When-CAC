import videos from '../../public/videos_info.json'
import { ObjectId } from 'mongodb';
import * as mongoDB from "mongodb";
import Game from './game';
import fs from 'fs';
import path from 'path';

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

interface Video {
    title: string,
    formatted_title: string,
    ep: number,
    video_id: string,
    date: string
}

export async function createGame(game: Game) {
    let createdId = null;
    if (process.env.DB_CONN_STRING) {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        try {
            await client.connect();
            const db: mongoDB.Db = client.db("WhenCAC");
            if (db) {
                const gamesCollection = db.collection("games");
                const result = await gamesCollection.insertOne(game);
                createdId = result.insertedId;
            }
        } catch (err) {
            console.error(err);
        } finally {
            await client.close();
            return createdId;
        }
    }
    return null;
}

async function getGuessVideo(uuid: string, round: number) {
    let guessVideo = null;
    if (process.env.DB_CONN_STRING) {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        try {
            await client.connect();
            const db: mongoDB.Db = client.db("WhenCAC");
            if (db) {
                const gamesCollection = db.collection("games");
                const game = await gamesCollection.findOne<Game>({ _id: new ObjectId(uuid) });
                if (game) {
                    const videoCollection = db.collection("videos");
                    const video = await videoCollection.findOne<GuessVideo>({ ep: game.episodes[round - 1] });
                    if (video) {
                        guessVideo = {
                            formatted_title: video.formatted_title,
                            video_id: video.video_id,
                            image_url: getImageAsBase64(`${video.video_id}.jpg`)
                        };
                    }
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            await client.close();
        }
    }
    return guessVideo;
}

async function getResponseVideo(uuid: string, round: number) {
    let responseVideo = null;
    if (process.env.DB_CONN_STRING) {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        try {
            await client.connect();
            const db: mongoDB.Db = client.db("WhenCAC");
            if (db) {
                const gamesCollection = db.collection("games");
                const game = await gamesCollection.findOne<Game>({ _id: new ObjectId(uuid) });
                if (game) {
                    const videoCollection = db.collection("videos");
                    const video = await videoCollection.findOne<VideoResponse>({ ep: game.episodes[round - 1] });
                    if (video) {
                        responseVideo =
                        {
                            title: video.title,
                            ep: video.ep,
                            video_id: video.video_id,
                            date: video.date
                        };
                    }
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            await client.close();
        }
    }
    return responseVideo;
}

export function getImageAsBase64(relativePath: string): string {
    const filePath = path.join(process.cwd(), 'thumbnails/', relativePath);
    const fileData = fs.readFileSync(filePath);
    return `data:image/${path.extname(filePath).slice(1)};base64,${fileData.toString('base64')}`;
}

export { getGuessVideo, getResponseVideo };