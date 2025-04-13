import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Game.module.css";
import bg from "../../public/images/bg-dark.png";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

import { SelectEpisode, SelectDate } from "../components/Inputs"
import Header from "../components/Header"
import RoundDisplay from "../components/Header/NumberDisplay";
import { useRouter } from "next/router";
import { GameData } from "./api/game";
import { GuessVideo, VideoResponse } from "@/api/database";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [latestEp, setLatestEp] = useState(1);
  const [uuid, setUuid] = useState("");
  const [ep, setEp] = useState(1);
  const [date, setDate] = useState(dayjs());
  const [answered, setAnswered] = useState(false);
  const [round, setRound] = useState(1);
  const [guessVideo, setGuessVideo] = useState<null | GuessVideo>(null);
  const [videoResponse, setVideoResponse] = useState<null | VideoResponse>(null);

  const router = useRouter();

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
    )).json() as VideoResponse
    if (guessVideoRes === null) {
      return //Error
    }
    setVideoResponse(guessVideoRes)
    setAnswered(true)
  }

  async function onNext() {
    if (round < 5) {
      const nextRound = round + 1;
      setRound(nextRound)
      await getRound(nextRound)
      setAnswered(false)
    } else {
      // TODO: Go to result page
      router.push('/')
    }
  }

  async function getRound(round: number, uuidString?: string) {
    console.log("getRound")
    uuidString = uuidString || uuid
    const guessVideoRes = await (await fetch(`/api/game/guess?uuid=${uuidString}&round=${round}`)).json() as GuessVideo
    if (guessVideoRes === null) {
      return //Error
    }
    setGuessVideo(guessVideoRes)
  }

  useEffect(() => {
    async function createGame() {
      if (guessVideo === null) {
        const res = await (await fetch('/api/game')).json() as GameData
        if (res === null) {
          return //Error
        }
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
        <Header>
          <RoundDisplay round={round} />
        </Header>
        <main className={styles.main}>
          <div className={styles.mainExample}>
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
                `Data de publicação: ${!answered ? "??/??/????" : videoResponse?.date.split("-").reverse().join("/")}`
              }</p>
              <a className={`${styles.secondary} ${answered ? "" : styles.hide}`} href={`https://www.youtube.com/watch?v=${videoResponse?.video_id}`}>
                {answered && "Assistir o vídeo"}
              </a>
            </div>
            <div className={styles.greenAnswerContainer}>
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
                  seu resultado aqui =)
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
      </div>
    </>
  );
}
