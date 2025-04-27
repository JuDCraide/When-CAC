import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Game.module.css";
import bg from "../../public/images/bg-dark.png";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

import { SelectEpisode, SelectDate } from "../components/Inputs"
import Header from "../components/Header"
import { useRouter } from "next/router";
import { GameData } from "./api/game";
import { GuessVideo, ResultResponse, VideoResponse } from "@/api/database";
import { useSearchParams } from "next/navigation";
import { stringDateToSlash } from "@/utils/stringDateToSlash";
import ErrorDialog from "@/components/ErrorDialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  const [ep, setEp] = useState(1);
  const [date, setDate] = useState(dayjs());
  const [answered, setAnswered] = useState(false);
  const [round, setRound] = useState(1);
  const [guessVideo, setGuessVideo] = useState<null | GuessVideo>(null);
  const [videoResponse, setVideoResponse] = useState<null | VideoResponse>(null);
  const [result, setResult] = useState<Result>({ rounds: [], epTotal: 0, dateTotal: 0, totalPoints: 0, seed: "" });

  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [error, setError] = useState("");


  const searchParams = useSearchParams()
  const seed = searchParams.get('seed')
  const router = useRouter();

  function handleError(err: string) {
    setError(err)
    setOpenErrorDialog(true)
  }

  async function onAnswer() {
    if (dayjs().diff(date, 'day') && ep === 1) {
      //TODO: make a are you sure you want to guess? 
    }
    const guessVideoRes = await (await fetch(`/api/game/response`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          uuid,
          round,
          ep,
          date,
        })
      }
    )).json() as ResultResponse | string
    if (typeof guessVideoRes === 'string') {
      //Error      
      return handleError(guessVideoRes)
    }
    setVideoResponse(guessVideoRes.responseVideo)
    setResult({
      rounds: [...result.rounds, {
        ep: {
          guess: ep,
          res: guessVideoRes.responseVideo.ep,
          diff: Math.abs(guessVideoRes.responseVideo.ep - ep),
          points: guessVideoRes.points.ep,
        },
        date: {
          guess: date.format('DD/MM/YYYY'),
          res: stringDateToSlash(guessVideoRes.responseVideo.date),
          diff: Math.abs(date.diff(dayjs(guessVideoRes.responseVideo.date), 'day')),
          points: guessVideoRes.points.date,
        },
        roundTotal: guessVideoRes.points.ep + guessVideoRes.points.date,
        title: guessVideoRes.responseVideo.title,
        image: guessVideo?.image_url || "",
        id: guessVideoRes.responseVideo.video_id
      }],
      epTotal: result.epTotal + guessVideoRes.points.ep,
      dateTotal: result.dateTotal + guessVideoRes.points.date,
      totalPoints: result.totalPoints + guessVideoRes.points.ep + guessVideoRes.points.date,
      seed: result.seed
    })
    setAnswered(true)
  }

  async function onNext() {
    if (round < 5) {
      const nextRound = round + 1;
      setRound(nextRound)
      await getRound(nextRound)
      setAnswered(false)
    } else {
      router.push({
        pathname: '/end',
        query: {
          results: JSON.stringify(result)
        }
      })
    }
  }

  async function getRound(round: number, uuidString?: string) {
    uuidString = uuidString || uuid
    const guessVideoRes = await (await fetch(`/api/game/guess?uuid=${uuidString}&round=${round}`)).json() as GuessVideo | string
    if (typeof guessVideoRes === 'string') {
      //Error      
      return handleError(guessVideoRes)
    }
    setGuessVideo(guessVideoRes)
  }

  useEffect(() => {
    async function createGame() {
      if (guessVideo === null) {
        const path = `/api/game${seed ? `?seed=${seed}` : ""}`
        const rawRes = await fetch(path)
        if (rawRes.status !== 200) {
          const error = await rawRes.json()
          //Error
          return handleError(error.message)
        }
        const res = await rawRes.json() as GameData
        setResult({
          ...result,
          seed: res.seed,
        })
        setUuid(res.uuid)
        setLatestEp(res.latestEp)
        await getRound(1, res.uuid)
      }
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
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        <Header round={round} points={result.totalPoints} />
        <main className={styles.main}>
          <div className={styles.mainGame}>
            <div className={styles.video}>
              <div className={styles.mainImage}>
                <div style={{
                  backgroundImage: `url(${guessVideo?.image_url})`,
                }} />
              </div>
              <h3>{
                !answered ? guessVideo?.formatted_title : videoResponse?.title
              }</h3>
              <p>{
                `Data de publicação: ${!answered ? "??/??/????" : result.rounds[round - 1]?.date.res}`
              }</p>
              <a
                className={`${styles.secondary} ${answered ? "" : styles.hide}`}
                href={answered && videoResponse != null ? `https://www.youtube.com/watch?v=${videoResponse?.video_id}` : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
              >
                {answered && "Assistir o vídeo"}
              </a>
            </div>
            <div className={`${styles.greenAnswerContainer} ${answered ? styles.result : ""}`}>
              {!answered ?
                <>
                  <SelectDate setDate={setDate} />
                  <SelectEpisode ep={ep} setEp={setEp} latestEp={latestEp} />
                  <button
                    onClick={async () => await onAnswer()}
                    className={`${styles.cleanButton} ${styles.primary}`}
                  >
                    Adivinhar
                  </button>
                </>
                :
                <>
                  {/* <h2>Resultado</h2> */}
                  <div>
                    <h3>📅 {result.rounds[round - 1]?.date.res}</h3>
                    <p>Você adivinhou: <h5>{result.rounds[round - 1]?.date.guess}</h5></p>
                    <p>Diferença: <h5>{result.rounds[round - 1]?.date.diff}</h5></p>
                  </div>
                  <div>
                    <h3>💻 Ep. {result.rounds[round - 1]?.ep.res}</h3>
                    <p>Você adivinhou: <h5>Ep. {result.rounds[round - 1]?.ep.guess}</h5></p>
                    <p>Diferença: <h5>{result.rounds[round - 1]?.ep.diff}</h5></p>
                  </div>
                  <div>
                    <div className={styles.resultPoints}>
                      <div className={styles.resultPoints}>
                        <h4>📅 {result.rounds[round - 1]?.date.points}</h4><h5>/100</h5>
                      </div>
                      <h4>+</h4>
                      <div className={styles.resultPoints}>
                        <h4>💻 {result.rounds[round - 1]?.ep.points}</h4><h5>/100</h5>
                      </div>
                    </div>
                    <div className={styles.resultPoints}>
                      <h4>=</h4>
                      <div className={styles.resultPoints}>
                        <h4>🏆 {result.rounds[round - 1]?.roundTotal}</h4><h5>/200</h5>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={async () => await onNext()}
                    className={`${styles.cleanButton} ${styles.primary}`}
                  >
                    Próximo Round
                  </button>
                </>
              }
            </div>
          </div>
        </main>

        <ErrorDialog openErrorDialog={openErrorDialog} seed="{result.seed} "error={error} />
      </div>
    </>
  );
}
