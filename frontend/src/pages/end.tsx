import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/End.module.css";
import bg from "../../public/images/bg-dark.png";
import Header from "../components/Header"
import { Result } from "./game";
import { ClickableRoundDisplay } from "@/components/Header/RoundDisplay";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// TODO: Change how we send the result to the end page

export default function Home() {
  // let fakeResult: Result = {
  //   rounds: [
  //     {
  //       ep: {
  //         guess: 1462,
  //         res: 1494,
  //         diff: 32,
  //         points: 81
  //       },
  //       date: {
  //         guess: "18/04/2025",
  //         res: "06/10/2020",
  //         diff: 1655,
  //         points: 3
  //       },
  //       roundTotal: 84,
  //       id: "",
  //       title: "ELA TROCOU A COR DA SALA DE JANTAR! - Ep. 1494",
  //       image: ""
  //     },
  //     {
  //       ep: {
  //         guess: 546,
  //         res: 1057,
  //         diff: 511,
  //         points: 3
  //       },
  //       date: {
  //         guess: "18/04/2025",
  //         res: "13/09/2017",
  //         diff: 2774,
  //         points: 0
  //       },
  //       roundTotal: 3,
  //       id: "",
  //       title: "TOCA RAUL! - Ep. 1057",
  //       image: ""
  //     },
  //     {
  //       ep: {
  //         guess: 270,
  //         res: 90,
  //         diff: 180,
  //         points: 30
  //       },
  //       date: {
  //         guess: "18/04/2025",
  //         res: "31/03/2014",
  //         diff: 4036,
  //         points: 0
  //       },
  //       roundTotal: 30,
  //       id: "",
  //       title: "QUERO SER ATRIZ - Ep. 90",
  //       image: ""
  //     },
  //     {
  //       ep: {
  //         guess: 1164,
  //         res: 963,
  //         diff: 201,
  //         points: 25
  //       },
  //       date: {
  //         guess: "18/04/2025",
  //         res: "24/04/2017",
  //         diff: 2916,
  //         points: 0
  //       },
  //       roundTotal: 25,
  //       id: "",
  //       title: "PRESSÃO - Ep. 963",
  //       image: ""
  //     },
  //     {
  //       ep: {
  //         guess: 996,
  //         res: 706,
  //         diff: 290,
  //         points: 12
  //       },
  //       date: {
  //         guess: "18/04/2025",
  //         res: "03/04/2016",
  //         diff: 3302,
  //         points: 0
  //       },
  //       roundTotal: 12,
  //       id: "",
  //       title: "RUMO À FRANÇA!- Ep.706",
  //       image: ""
  //     }
  //   ],
  //   epTotal: 151,
  //   dateTotal: 3,
  //   totalPoints: 154
  // }

  const zeroResult: Result = {
    rounds: [],
    epTotal: 0,
    dateTotal: 0,
    totalPoints: 0,
    seed: ""
  }
  const [result, setResult] = useState<Result>(zeroResult);
  const [round, setRound] = useState(0);
  const router = useRouter();


  useEffect(() => {
    const query: string = router.query?.results as string
    const result = JSON.parse(query) as Result
    setResult(result)
    setRound(1)
    // console.log(result)
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
        <Header points={result.totalPoints} />
        <main className={styles.main}>
          <div className={styles.mainResult}>
            <div className={styles.greenAnswerContainer}>
              <h2>📅 {result.epTotal}</h2><h4>/1000</h4>
            </div>
            <div className={styles.greenAnswerContainer}>
              <h2>💻 {result.dateTotal}</h2><h4>/1000</h4>
            </div>
            <div className={styles.greenAnswerContainer}>
              <h2>🏆 {result.totalPoints}</h2><h4>/2000</h4>
            </div>
          </div>
          <div className={styles.mainResult}>
            <p>Detalhes do round:</p>
            <ClickableRoundDisplay round={round} setRound={setRound} />
          </div>
          {round > 0 ?
            <div className={`${styles.mainGame} ${round == 0 ? styles.hide : ""}`}>
              <div className={styles.video}>
                <div className={styles.mainImage}>
                  <div style={{
                    backgroundImage: `url(${result.rounds[round - 1].image})`,
                  }} />
                </div>
                <h3>{
                  result.rounds[round - 1].title
                }</h3>
                <p>{
                  `Data de publicação: ${result.rounds[round - 1]?.date.res}`
                }</p>
                <a
                  className={styles.secondary}
                  href={`https://www.youtube.com/watch?v=${result.rounds[round - 1].id}`}
                >
                  {"Assistir o vídeo"}
                </a>
              </div>
              <div className={`${styles.greenAnswerContainer} ${styles.result}`}>

                <h2>Round {round}</h2>
                <div>
                  <h3>📅 {result.rounds[round - 1]?.date.res}</h3>
                  <span>Você adivinhou: <h5>{result.rounds[round - 1]?.date.guess}</h5></span>
                  <span>Diferença: <h5>{result.rounds[round - 1]?.date.diff}</h5></span>
                </div>
                <div>
                  <h3>💻 Ep. {result.rounds[round - 1]?.ep.res}</h3>
                  <span>Você adivinhou: <h5>Ep. {result.rounds[round - 1]?.ep.guess}</h5></span>
                  <span>Diferença: <h5>{result.rounds[round - 1]?.ep.diff}</h5></span>
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
              </div>
            </div>
            :
            <div className={styles.mainGame} />
          }
          <p className={styles.seed}>Seed do jogo: {result.seed}</p>
        </main>
      </div>
    </>
  );
}
