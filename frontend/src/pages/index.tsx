import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import bg from "../../public/images/bg-dark.png";
import thumb from "../../public/images/_1lRF7UL0mg.jpg"
import { useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';

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
  const latestEp: number = 1723
  let [ep, setEp] = useState(1);

  const setEpisode = (n: number) => {
    if (n > latestEp) {
      n = latestEp
    } else if (n < 1) {
      n = 1
    }
    setEp(n)
  }

  const sx = {
    "& .MuiInputLabel-root.Mui-focused": { color: "var(--white)" }, //styles the label
    "& .MuiInputLabel-root": { color: "var(--white)" }, //styles the label
    "& .MuiOutlinedInput-root": {
      "& > fieldset": {
        borderColor: "var(--white)"
      },
      "& > .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--white)"
      },
      "&:hover > fieldset": {
        borderColor: "var(--white)",
        border: "2px solid var(--white)",
      },
      "&:active > fieldset": {
        borderColor: "var(--white)",
        border: "2px solid var(--white)",
      },
      "&:focus > fieldset": {
        borderColor: "var(--white)",
        border: "2px solid var(--white)",
      },
      "& .MuiSvgIcon-root": {
        color: "var(--white)"
      },
    },
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
          <div className={styles.mainExample}>
            <div className={styles.guess}>
              <div>
                <h2>
                  {/* Guess When the video was publish and What Ep it is */}
                  ADIVINHE <span className={styles.lightGreenTxt}>QUAL O EP. </span>
                  E <span className={styles.lightGreenTxt}>QUANDO</span> O VÍDEO
                  FOI PUBLICADO
                </h2>
                <p>Teste suas habilidades de detetive e fã do canal Cadê a Chave? </p>
              </div>
              <div className={styles.greenContainer}>
                <span>Acha que sabe a resposta?</span>
                <button
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
              </div>
            </div>
            <div className={styles.video}>
              <div className={styles.mainImage}>
                <div style={{
                  backgroundImage: `url(${thumb.src})`,
                }} />
              </div>
              <h3>{
                !answerReveal ? video.formatted_title : video.title
              }</h3>
              <p>Data de publicação: {
                !answerReveal ? "??/??/????" : video.date.split("-").reverse().join("/")
              }</p>
              <a className={answerReveal ? styles.secondary : styles.hide} href={`https://www.youtube.com/watch?v=${video.video_id}`}>
                {answerReveal && "Assistir o vídeo"}
              </a>
            </div>
          </div>
          <div className={styles.greenContainer}>
            <h2>Como jogar?</h2>
            <div className={styles.instructions}>
              <div className={styles.step}>
                <p>1 Analise a thumbnail e título do vídeo</p>
                <div className={styles.mainImage}>
                  <div style={{
                    backgroundImage: `url(${thumb.src})`,
                  }} />
                </div>
              </div>
              <div className={styles.step}>
                <p>2 Digite ou selecione no calendário o seu palpite de data</p>
                <div>
                  <ThemeProvider theme={createTheme({
                    palette: {
                      mode: 'dark',
                    },
                  })}>
                    <DatePicker
                      label="Data de publicação"
                      minDate={dayjs("2013-01-01")}
                      maxDate={dayjs()}
                      openTo="year"
                      sx={sx}
                    />
                  </ThemeProvider>
                  <p></p>
                </div>
              </div>
              <div className={styles.step}>
                <p>3 Digite ou selecione o seu palpite do número do episódio</p>
                <ThemeProvider theme={createTheme({
                  palette: {
                    mode: 'dark',
                  },
                })}>
                  <Slider
                    className={styles.textField}
                    step={1} min={1} max={latestEp} value={ep}
                    onChange={(e, value) => setEpisode(value as number)}
                    sx={{
                      color: 'var(--white)',
                      '& .MuiSlider-track': {
                        border: 'none',
                      },
                      '& .MuiSlider-thumb': {
                        backgroundColor: 'var(--white)',
                        border: '2px solid var(--dark-green)',
                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                          boxShadow: 'inherit',
                        },
                        '&::before': {
                          display: 'none',
                        },
                      },
                    }}
                  />
                  <TextField
                    id="outlined-controlled"
                    label="Outlined"
                    variant="outlined" sx={sx}
                    type="number"
                    value={ep}
                    onChange={(e) => setEpisode(Number(e.target.value))}
                  />
                </ThemeProvider>
              </div>
              <div className={styles.step}>
                <p>4 Quando estiver pronto, pressione adivinhar</p>
                <div>
                  <button
                    // onClick={() => setAnswerRevel(!answerReveal)}
                    className={`${styles.cleanbutton} ${styles.primary}`}
                  >
                    Adivinhar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          Feito com ♥ por Júlia e Leo
        </footer>
      </div>
    </>
  );
}
