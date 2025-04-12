import videos from '../../public/videos_info.json'

import * as mongoDB from "mongodb";
import Game from './game';

export interface GuessVideo {
    formatted_title: string,
    //image_url: string
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

async function getDatabase() {
    if (process.env.DB_CONN_STRING) {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        await client.connect();
        const db: mongoDB.Db = client.db("WhenCAC");
        return db;
    }
    return null;
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


function getGuessVideo(episode: number): GuessVideo {
    let result = videos.find(video => video.ep === episode)
    if (!result) {
        throw Error();
    }
    return result as GuessVideo;
}

function getResponseVideo(episode: number): VideoResponse {
    let result = videos.find(video => video.ep === episode)
    if (!result) {
        throw Error();
    }
    return result as VideoResponse;
}

export { getGuessVideo, getResponseVideo };