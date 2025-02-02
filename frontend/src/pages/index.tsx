import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import bg from "../../public/images/bg-dark.png";
import thumb from "../../public/images/_1lRF7UL0mg.jpg"
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  let [answerReveal, setAnswerRevel] = useState(false);
  let video = {
    title: "ESTRAGARAM O CHURRASCO - Ep.1074",
    formatted_title: "ESTRAGARAM O CHURRASCO - Ep.???",
    ep: 1074,
    video_id: "_1lRF7UL0mg",
    date: "2017-10-06"
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
        <header className={styles.header}
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))`
          }}
        >
          <div>
            <Image
              className={styles.logo}
              src="/images/logo-no-bg.png"
              alt="CAC logo"
              height={56}
              width={56}
              priority
            />
            <h1><b>When</b> CAC</h1>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.adivinhe}>
            <div>
              <h2>
                {/* Guess When the video was publish and What Ep it is */}
                ADIVINHE <span className={styles.lightGreenTxt}>QUAL O EP.</span><br />
                E <span className={styles.lightGreenTxt}>QUANDO</span> O VÍDEO <br />
                FOI PUBLICADO
              </h2>
              <p>Teste suas habilidades de detetive e fã do canal Cadê a Chave? </p>
            </div>
            <div className={styles.greenContainer}>
              <span>Acha que sabe a resposta?</span>
              <button
                // href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                // target="_blank"
                // rel="noopener noreferrer"
                onClick={() => setAnswerRevel(!answerReveal)}
                className={`${styles.cleanbutton} ${styles.primary}`}
              >
                {
                  !answerReveal ?
                    "Revelar resposta" :
                    "Esconder resposta"
                }
                <span className={styles.emoji}>{
                  !answerReveal ? "👁️" : "🕶️"
                }</span>
              </button>
              {/* <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondary}
              >
                Revelar resposta
              </a> */}
            </div>
          </div>
          <div className={styles.video}>
            <div className={styles.mainImage}
            >
              <div style={{
                backgroundImage: `url(${thumb.src})`,
              }} />
            </div>
            <h3>{
              !answerReveal ? video.formatted_title : video.title
            }</h3>
            <p>Data publicada: {
              !answerReveal ? "??/??/????" : video.date.split("-").reverse().join("/")
            }</p>
          </div>
        </main>
        <footer className={styles.footer}>
          Feito com ♥ por Júlia e Leo
        </footer>
      </div>
    </>
  );
}
