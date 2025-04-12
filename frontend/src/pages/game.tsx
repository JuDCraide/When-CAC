import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Game.module.css";
import bg from "../../public/images/bg-dark.png";
import thumb from "../../public/images/_1lRF7UL0mg.jpg"
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
  let latestEp: number = 1;
  let [ep, setEp] = useState(1);
  let [date, setDate] = useState(dayjs());
  let [answered, setAnswered] = useState(false);
  let [round, setRound] = useState(1);
  let [guessVideo, setGuessVideo] = useState<null | GuessVideo>(null);
  let [videoResponse, setVideoResponse] = useState<null | VideoResponse>(null);
  const router = useRouter();

  const onAnswer = () => {
    // TODO: getAnswer from api by fetch
    setAnswered(true)
  }

  const onNext = () => {
    setAnswered(false)
    if (round < 5) {
      setRound(round + 1)
      //TODO: get next round info from api
    } else {
      // TODO: Go to result page
      router.push('/')
    }
  }

  useEffect(() => {
    async function createGame() {
      if (guessVideo === null) {
        const res = await (await fetch('/api/game')).json() as GameData
        if (res === null) {
          return //Error
        }
        const uuid = res.uuid
        latestEp = res.latestEp
        const guessVideoRes = await (await fetch(`/api/game/guess?uuid=${uuid}&round=1`)).json() as GuessVideo
        if (guessVideoRes === null) {
          return //Error
        }
        setGuessVideo(guessVideoRes)
      }
    }
    createGame()
  }, [])

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
                  backgroundImage: `url(${thumb.src})`,
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
                  <SelectEpisode ep={ep} setEp={setEp} />
                  <button
                    onClick={() => onAnswer()}
                    className={`${styles.cleanButton} ${styles.primary}`}
                  >
                    Adivinhar
                  </button>
                </>
                :
                <>
                  seu resultado aqui =)
                  <button
                    onClick={() => onNext()}
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
