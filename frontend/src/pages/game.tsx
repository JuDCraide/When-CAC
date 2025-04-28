import Head from "next/head";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GamePage from "../components/GamePage";
import EndPage from "../components/EndPage";
import { GameData } from "./api/game";
import ErrorDialog from "@/components/ErrorDialog";

export interface RoundResult {
  ep: {
    guess: number,
    res: number,
    diff: number,
    points: number,
  },
  date: {
    guess: string,
    res: string,
    diff: number,
    points: number,
  },
  roundTotal: number,
  title: string,
  image: string,
  id: string,
}

export interface Result {
  rounds: RoundResult[],
  epTotal: number,
  dateTotal: number,
  totalPoints: number,
  seed: string,
}

export default function Home() {
  const [latestEp, setLatestEp] = useState(1);
  const [uuid, setUuid] = useState("");
  const [result, setResult] = useState<Result>({ rounds: [], epTotal: 0, dateTotal: 0, totalPoints: 0, seed: "" });

  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const searchParams = useSearchParams();

  const handleError = (err: string) => {
    setError(err)
    setOpenErrorDialog(true)
    setLoaded(true)
  }

  useEffect(() => {
    async function createGame() {
      const seed = searchParams.get('seed')
      const path = `/api/game${seed ? `?seed=${seed}` : ""}`
      const rawRes = await fetch(path)
      if (rawRes.status !== 200) {
        const error = await rawRes.json()
        //Error
        return handleError(error.message)
      }
      const res = await rawRes.json() as GameData
      setResult(r => ({
        ...r,
        seed: res.seed,
      }))
      setUuid(res.uuid)
      setLatestEp(res.latestEp)
      // await getRound(1, res.uuid)
      setLoaded(true)
    }
    createGame()
  }, []) // "@ts-expect-error

  return (
    <>
      <Head>
        <title>When CAC</title>
        <meta name="description" content="Jogo inspirado em When Taken sobre o canal Cadê a Chave" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loaded && (!finished ?
        <GamePage latestEp={latestEp} uuid={uuid} result={result} setResult={setResult} handleError={handleError} setFinished={setFinished} /> :
        <EndPage result={result} />)
      }
      <ErrorDialog openErrorDialog={openErrorDialog} seed={result.seed} error={error} />
    </>
  );
}
