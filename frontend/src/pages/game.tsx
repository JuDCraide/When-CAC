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
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  let videos = [
    {
      title: "ESTRAGARAM O CHURRASCO - Ep.1074",
      formatted_title: "ESTRAGARAM O CHURRASCO - Ep.???",
      ep: 1074,
      video_id: "_1lRF7UL0mg",
      date: "2017-10-06"
    },
    {
      title: "ESTRAGARAM O CHURRASCO - Ep.1074",
      formatted_title: "ESTRAGARAM O CHURRASCO - Ep.???",
      ep: 1074,
      video_id: "_1lRF7UL0mg",
      date: "2017-10-06"
    },
    {
      title: "ESTRAGARAM O CHURRASCO - Ep.1074",
      formatted_title: "ESTRAGARAM O CHURRASCO - Ep.???",
      ep: 1074,
      video_id: "_1lRF7UL0mg",
      date: "2017-10-06"
    },
    {
      title: "ESTRAGARAM O CHURRASCO - Ep.1074",
      formatted_title: "ESTRAGARAM O CHURRASCO - Ep.???",
      ep: 1074,
      video_id: "_1lRF7UL0mg",
      date: "2017-10-06"
    },
    {
      title: "ESTRAGARAM O CHURRASCO - Ep.1074",
      formatted_title: "ESTRAGARAM O CHURRASCO - Ep.???",
      ep: 1074,
      video_id: "_1lRF7UL0mg",
      date: "2017-10-06"
    }
  ]
  const latestEp: number = 1723
  let [ep, setEp] = useState(1);
  let [date, setDate] = useState(dayjs());
  let [answered, setAnswered] = useState(false);
  let [round, setRound] = useState(1);
  const router = useRouter();

  const onAnswer = () => {
    // TODO: calculate points based on date and ep
    setAnswered(true)
  }

  const onNext = () => {
    setAnswered(false)
    if(round < 5){
    setRound(round + 1)
    } else {
      // TODO: Go to result page
      router.push('/')
    }
  }

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
          <NumberDisplay round={round} />
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
                !answered ? videos[round - 1].formatted_title : videos[round - 1].title
              }</h3>
              <p>{!answered &&
                `Data de publicação: ${!answered ? "??/??/????" : videos[round - 1].date.split("-").reverse().join("/")}`
              }</p>
              <a className={answered ? styles.secondary : styles.hide} href={`https://www.youtube.com/watch?v=${videos[round - 1].video_id}`}>
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
