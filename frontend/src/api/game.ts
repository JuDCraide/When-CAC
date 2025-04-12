import { uuidv7 } from "uuidv7";

class Game {
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
    }
    
}