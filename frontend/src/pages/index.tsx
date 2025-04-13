import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import bg from "../../public/images/bg-dark.png";
import thumb from "../../public/images/_1lRF7UL0mg.jpg"
import { useState } from "react";
import dayjs from 'dayjs';

import { SelectEpisode, SelectDate } from "../components/Inputs"
import Header from "../components/Header"

//TODO: make API call
const LATEST_EP = 1723;

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

	const [ep, setEp] = useState(1);
	const [date, setDate] = useState(dayjs());

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
				<Header />
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
								<p>2 Digite ou selecione no calendário o seu palpite da data de publicação</p>
								<SelectDate setDate={setDate} />
							</div>
							<div className={styles.step}>
								<p>3 Digite ou selecione o seu palpite do número do episódio</p>
								<SelectEpisode ep={ep} setEp={setEp} latestEp={LATEST_EP} />
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
