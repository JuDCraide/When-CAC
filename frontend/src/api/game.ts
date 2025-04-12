import { ObjectId } from 'mongodb';
import * as Database from "./database";
import Seed from "./seed";

export default class Game {
    _id: ObjectId;
    seed: Seed;
    episodes: number[] = [0,0,0,0,0];
    ep_points: number[] = [0,0,0,0,0];
    date_points: number[] = [0,0,0,0,0];
    start_timestamp: number;

    constructor(seed: string | null = null){
        this._id = new ObjectId();
        this.start_timestamp = new Date().getTime();
        this.seed = new Seed(seed, this.start_timestamp);
        this.episodes = this.seed.get_episodes()
    }
}