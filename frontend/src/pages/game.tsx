import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Game.module.css";
import bg from "../../public/images/bg-dark.png";
import thumb from "../../public/images/_1lRF7UL0mg.jpg"
import { useState } from "react";
import dayjs from 'dayjs';

import { SelectEpisode, SelectDate } from "../components/Inputs"
import Header from "../components/Header"
import NumberDisplay from "../components/Header/NumberDisplay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  let video = {
    title: "ESTRAGARAM O CHURRASCO - Ep.1074",
    formatted_title: "ESTRAGARAM O CHURRASCO - Ep.???",
    ep: 1074,
    video_id: "_1lRF7UL0mg",
    date: "2017-10-06"
  }
  const latestEp: number = 1723
  let [ep, setEp] = useState(1);
  let [date, setDate] = useState(dayjs());
  let [answerReveal, setAnswerRevel] = useState(false);
  const roundNumber = 2;

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
          <NumberDisplay round={roundNumber}/>
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
                !answerReveal ? video.formatted_title : video.title
              }</h3>
              <p>{!answerReveal &&
                `Data de publicação: ${!answerReveal ? "??/??/????" :video.date.split("-").reverse().join("/")}`
              }</p>
              <a className={answerReveal ? styles.secondary : styles.hide} href={`https://www.youtube.com/watch?v=${video.video_id}`}>
                {answerReveal && "Assistir o vídeo"}
              </a>
            </div>
            <div className={styles.greenAnswerContainer}>
              <SelectDate setDate={setDate} />
              <SelectEpisode ep={ep} setEp={setEp} />
              <button
                // onClick={() => setAnswerRevel(!answerReveal)}
                className={`${styles.cleanButton} ${styles.primary}`}
              >
                Adivinhar
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
