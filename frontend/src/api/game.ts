import { uuidv7 } from "uuidv7";
import * as Database from "./database";
import Seed from "./seed";

export default class Game {
    uuid: string;
    seed: Seed;
    episodes: number[] = [0,0,0,0,0];
    ep_points: number[] = [0,0,0,0,0];
    date_points: number[] = [0,0,0,0,0];
    start_timestamp: number;

    constructor(seed: string | null = null){
        this.uuid = uuidv7();
        this.start_timestamp = new Date().getTime();
        this.seed = new Seed(seed, this.start_timestamp);
        this.episodes = this.seed.get_episodes()
    }

    get_round(round: number): Database.GuessVideo{
        return Database.getGuessVideo(this.episodes[round-1])
    }

    get_round_response(round: number): Database.VideoResponse{
        return Database.getResponseVideo(this.episodes[round-1])
    }

}