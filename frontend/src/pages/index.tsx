import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import bg from "../../public/images/bg-dark.png";
import thumb from "../../public/images/_1lRF7UL0mg.jpg"
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { useRouter } from "next/router";

import { SelectEpisode, SelectDate } from "../components/Inputs"
import Header from "../components/Header"
import SeedDialog from "@/components/SeedDialog";
import { stringDateToSlash } from "@/utils/stringDateToSlash";
import { LATEST_EP } from "@/api/seed";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});


export default function Home() {
	const latestEp = LATEST_EP;

	const video = {
		title: "ESTRAGARAM O CHURRASCO - Ep.1074",
		formatted_title: "ESTRAGARAM O CHURRASCO - Ep.???",
		ep: 1074,
		video_id: "_1lRF7UL0mg",
		date: "2017-10-06"
	}

	const [answerReveal, setAnswerReveal] = useState(false);
	const [ep, setEp] = useState(1);
	const [date, setDate] = useState(dayjs());
	const router = useRouter();

	const [openSeedDialog, setOpenSeedDialog] = useState(false);

	function onClick(seeded: boolean = false) {
		if (seeded) {
			setOpenSeedDialog(true)
		} else {
			router.push('/game')
		}
	}

	const onCloseDialog = () => {
		setOpenSeedDialog(false)
	}

	function onStartGame(seed: string) {
		router.push(`/game?seed=${seed}`)
	}

	useEffect(() => {
		fetch(`/api/statistics?origin=web`)
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
									onClick={() => setAnswerReveal(!answerReveal)}
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
								!answerReveal ? "??/??/????" : stringDateToSlash(video.date)
							}</p>
							<a
								className={answerReveal ? styles.secondary : styles.hide}
								href={answerReveal ? `https://www.youtube.com/watch?v=${video.video_id}` : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
							>
								{answerReveal && "Assistir o vídeo"}
							</a>
						</div>
					</div>
					<div className={styles.play}>
						<button className={`${styles.cleanButton} ${styles.playItem}`} onClick={() => onClick()}>
							<div>
								<h3>Jogar aleatório</h3>
								<span className={styles.emoji}>🔄️</span>
							</div>
						</button>
						<button className={`${styles.cleanButton} ${styles.playItem}`} onClick={() => onClick(true)}>
							<div>
								<h3>Jogar seeded</h3>
								<span className={styles.emoji}>🌱</span>
							</div>
						</button>
					</div>
					<div className={styles.greenContainer}>
						<h2>Como jogar?</h2>
						<div className={styles.instructions}>
							<div className={styles.step}>
								<p>1. Analise a thumbnail e título do vídeo</p>
								<div className={styles.mainImage}>
									<div style={{
										backgroundImage: `url(${thumb.src})`,
									}} />
								</div>
								<h3>ESTRAGARAM O CHURRASCO - Ep.???</h3>
							</div>
							<div className={styles.step}>
								<p>2. Digite ou selecione o seu palpite do número do episódio</p>
								<SelectEpisode ep={ep} setEp={setEp} latestEp={latestEp} />
							</div>
							<div className={styles.step}>
								<p>3. Digite ou selecione no calendário o seu palpite da data de publicação</p>
								<SelectDate setDate={setDate} />
							</div>
							<div className={styles.step}>
								<p>4. Quando estiver pronto, pressione adivinhar</p>
								<div>
									<button
										onClick={() => console.log(date)}
										className={`${styles.cleanbutton} ${styles.primary}`}
									>
										Adivinhar
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.faq}>
						<h2>Perguntas frequentes</h2>
						{/* <Accordion>
							<AccordionSummary>Como funcionam os pontos?</AccordionSummary>
							<AccordionDetails>
								Pontuação
								<ul>
									<li>5 rounds com no máximo de 1000 pontos</li>
									<li>Cada round com no máximo de 200 pontos</li>
								</ul>
								Pontuação data
								
								Pontuação episódio
								
							</AccordionDetails>
						</Accordion> */}
						<Accordion>
							<AccordionSummary>Como jogar em outras plataformas?</AccordionSummary>
							<AccordionDetails>
								<ul>
									<li>Site Web - Jogue em <a href="https://when-cac.vercel.app/">https://when-cac.vercel.app/</a></li>
									<li>Unity Android APKPure - Baixe o apk em APKPure <a href="https://apkpure.com/p/com.JuliaDCraide.WhenCAC">https://apkpure.com/p/com.JuliaDCraide.WhenCAC</a></li>
									<li>Unity Android itch.io - Baixe o apk pelo itch.io em <a href="https://judcraide.itch.io/when-cac">https://judcraide.itch.io/when-cac</a></li>
									<li>Unity Web - Jogue em <a href="https://judcraide.itch.io/when-cac">https://judcraide.itch.io/when-cac</a></li>
									<li>Unity Windows - Baixe o installer em <a href="https://judcraide.itch.io/when-cac">https://judcraide.itch.io/when-cac</a> ou baixe o zip com executável no mesmo link</li>
								</ul>
							</AccordionDetails>
						</Accordion>
					</div>
				</main>
				<footer className={styles.footer}>
					<p>
						Feito com ♥ por Júlia e Leo
					</p>
					<div>
						<a href="/policy">Política Privacidade</a>
						<a href="/terms">Termos de Uso</a>
					</div>
				</footer>

				<SeedDialog openSeedDialog={openSeedDialog} onCloseDialog={onCloseDialog} onPlayGame={onStartGame} />
			</div>
		</>
	);
}
