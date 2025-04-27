import * as random from "random-seed";
export const LATEST_EP = 1736;
export const MISSING_EPS = [59, 87, 107, 225, 251, 298, 308, 309, 395, 449, 581, 593, 640, 715, 716, 767, 912, 916, 939, 983, 1070, 1151, 1198, 1202, 1215, 1234, 1265, 1323, 1351, 1372, 1374, 1375, 1378, 1380, 1386, 1387, 1389, 1397, 1418, 1439, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1629, 1682]

interface decodedSeed {
    start_timestamp: number;
    latest_ep: number;
}

export default class Seed {
    start_timestamp: number;
    latest_ep: number;
    encoded_seed: string;

    constructor(encoded_seed: string | null = null, start_timestamp: number) {
        if (encoded_seed) {
            this.encoded_seed = encoded_seed;
            try {
                const decoded = this.decode_seed()
                this.start_timestamp = decoded.start_timestamp
                this.latest_ep = decoded.latest_ep
            } catch (err) {
                throw err
            }
        }
        else {
            this.start_timestamp = start_timestamp;
            this.latest_ep = LATEST_EP;
            this.encoded_seed = this.encode_seed()
        }
    }

    get_latest_ep(): number {
        return this.latest_ep;
    }

    get_episodes(): number[] {
        const rand = random.create(this.encoded_seed);
        const eps: number[] = []
        while (eps.length < 5) {
            const ep = rand.intBetween(1, this.latest_ep);
            if (eps.includes(ep) || MISSING_EPS.includes(ep)) continue;
            eps.push(ep);
        }
        return eps
    }

    decode_seed(): decodedSeed {
        try {
            const seed = JSON.parse(Buffer.from(this.encoded_seed, 'base64').toString('ascii'))
            if (!this.isSeedValid(seed)) {
                throw Error()
            }
            return seed as decodedSeed;
        } catch {
            throw Error("Invalid Seed")
        }
    }

    encode_seed(): string {
        return Buffer.from(JSON.stringify({
            latest_ep: this.latest_ep,
            start_timestamp: this.start_timestamp,
        })).toString('base64');
    }

    isSeedValid(value: object): value is Seed {
        const keys = Object.keys(value)
        const requiredKeys = Object.keys(Seed)

        if (typeof value !== 'object' || value === null)
            return false;

        return (
            requiredKeys.every(key => key in value)                              //  Ensure all required keys are present
            && (Object.keys(value) as (keyof Seed)[]).every(key => keys.includes(key))    //  Ensure no undefined keys are present
        );
    }

}