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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";

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
							<Link
								className={answerReveal ? styles.secondary : styles.hide}
								href={answerReveal ? `https://www.youtube.com/watch?v=${video.video_id}` : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
							>
								{answerReveal && "Assistir o vídeo"}
							</Link>
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
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon style={{ color: "var(--white);" }} />}
								aria-controls="panel1-content"
								id="panel1-header"
							>Como funcionam os pontos?</AccordionSummary>
							<AccordionDetails className={styles.faqDetails}>
								<h3>🎯 Sistema de Pontuação</h3>
								Jogo possui 5 rounds com pontuação total de no máximo de 1000 pontos.
								Cada round pode render até <strong>200 pontos</strong>:
								<ul>
									<li>100 pontos pelo Episódio</li>
									<li>100 pontos pela Data</li>
								</ul>
								<div>A pontuação final é a soma das duas.</div>

								<br />
								<h3>📺 Pontuação por Episódio</h3>
								A pontuação depende da diferença entre o episódio real e o que você chutou:
								<ul>
									<li>Acerto exato → 100 pontos</li>
									<li>Erro de até 10 episódios → de 99 a 96 pontos (queda gradual)</li>
									<li>Erro de 11 a 25 episódios → de 95 a 85 pontos</li>
									<li>Erro de 26 a 50 episódios → de 85 a 70 pontos</li>
									<li>Erro de 51 a 100 episódios → de 70 a 50 pontos</li>
									<li>Erro de 101 a 200 episódios → de 50 a 25 pontos</li>
									<li>Erro de 201 a 300 episódios → de 25 a 10 pontos</li>
									<li>Erro acima de 300 episódios → até 0 pontos</li>
								</ul>
								
								<br />
								<h3>📅 Pontuação por Data</h3>
								Baseado na diferença de dias entre a data real e o palpite:
								<ul>
									<li>Erro de até 1 dia → 100 pontos</li>
									<li>Erro de até 3 dias → 99 pontos</li>
									<li>Erro de até 7 dias → 98 pontos</li>
									<li>Erro de 8 a 15 dias → 96 a 97 pontos (queda gradual)</li>
									<li>Erro de 16 a 31 dias → 85 a 95 pontos</li>
									<li>Erro de 32 a 91 dias → 70 a 85 pontos</li>
									<li>Erro de 92 a 183 dias → 55 a 70 pontos</li>
									<li>Erro de 184 a 365 dias → 35 a 55 pontos</li>
									<li>Erro de até 3 anos → 15 a 35 pontos</li>
									<li>Erro acima de 3 anos (até 5 anos) → 0 a 15 pontos</li>
									<li>Erro acima de 5 anos → 0 pontos</li>
								</ul>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon style={{ color: "var(--white);" }} />}
								aria-controls="panel2-content"
								id="panel2-header"
							>Como jogar em outras plataformas?</AccordionSummary>
							<AccordionDetails className={styles.faqDetails}>
								<p>
									Este jogo foi desenvolvido como <strong>Projeto Multidisciplinar para Jogos</strong>, para conclusão do curso de <strong>Jogos Digitais</strong> da <strong>UNINTER</strong>.
									O objetivo do projeto foi colocar em prática as competências desenvolvidas ao longo do curso, resultando em uma demonstração funcional que integra design de jogos, programação, arte, sonorização, otimização, publicação e polimento.
								</p><p>
									A produção combinou o uso de Next.js com TypeScript, que funciona como backend e versão web funcional do jogo, além do motor Unity para as versões em Android, Web e Windows.
									Ele pode ser jogado pelos seguintes links:
								</p>
								<ul>
									<li>Site Web - Jogue em <Link href="https://when-cac.vercel.app/">https://when-cac.vercel.app/</Link></li>
									<li>Unity Android APKPure - Baixe o apk em APKPure <Link href="https://apkpure.com/p/com.JuliaDCraide.WhenCAC">https://apkpure.com/p/com.JuliaDCraide.WhenCAC</Link></li>
									<li>Unity Android itch.io - Baixe o apk pelo itch.io em <Link href="https://judcraide.itch.io/when-cac">https://judcraide.itch.io/when-cac</Link></li>
									<li>Unity Web - Jogue em <Link href="https://judcraide.itch.io/when-cac">https://judcraide.itch.io/when-cac</Link></li>
									<li>Unity Windows - Baixe o installer em <Link href="https://judcraide.itch.io/when-cac">https://judcraide.itch.io/when-cac</Link> ou baixe o zip com executável no mesmo link</li>
								</ul>
							</AccordionDetails>

						</Accordion>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon style={{ color: "var(--white);" }} />}
								aria-controls="panel2-content"
								id="panel2-header"
							>Quem são os desenvolvedores?</AccordionSummary>
							<AccordionDetails className={styles.faqDetails}>
								<p>
									Este jogo foi desenvolvido por Júlia D. Craide e Leonardo R. Gobatto, casal de desenvolvedores que se conheceram no curso de 
									Engenharia de Computação da UFRGS. Ambos compartilham o interesse por jogos e pelos canais do YouTube Cadê a Chave e Coisa de Nerd.
									Atualmente, Júlia atua como Engenheira de Software e Leonardo está realizando seu doutorado na UFRGS. Entre em contato conosco:
								</p>
								<ul>
									<li><Link href="https://www.linkedin.com/in/juliadcraide/">Júlia D. Craide</Link></li>
									<li><Link href="https://www.linkedin.com/in/leonardorgobatto/">Leonardo R. Gobatto</Link></li>
								</ul>
								<p>
								As versões em Unity foram criadas exclusivamente por Júlia como projeto final do curso de Jogos Digitais. A versão web, por sua vez, 
								foi desenvolvida em parceria pelos dois. Para mais informações sobre o desenvolvimento:
								</p>
								<ul>
									<li><Link href="https://github.com/JuDCraide/When-CAC">Web and Backend</Link></li>
									<li><Link href="https://github.com/JuDCraide/When-CAC-Unity">Unity</Link></li>
								</ul>
							</AccordionDetails>
						</Accordion>
					</div>
				</main>
				<footer className={styles.footer}>
					<p>
						Feito com ♥ por Júlia e Léo
					</p>
					<div>
						<Link href="/policy">Política Privacidade</Link>
						<Link href="/terms">Termos de Uso</Link>
					</div>
				</footer>

				<SeedDialog openSeedDialog={openSeedDialog} onCloseDialog={onCloseDialog} onPlayGame={onStartGame} />
			</div>
		</>
	);
}
