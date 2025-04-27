import Image from "next/image";
import styles from "./styles.module.css";
import bg from "../../../public/images/bg-dark.png";
import RoundDisplay from "./RoundDisplay";
import PointsDisplay from "./PointsDisplay";
import { useRouter } from "next/router";

interface HeaderProps {
	round?: number | null,
	points?: number | null,
	home?: boolean,
}

export default function Header({ round = null, points = null, home = false }: HeaderProps) {
	const router = useRouter();
	return (
		<header className={styles.header}
			style={{
				backgroundImage: `url(${bg.src})`,
			}}
		>
			<button className={`${styles.cleanButton} ${styles.logo}`} onClick={() => router.push('/')}>
				<Image
					src="/images/logo-no-bg.png"
					alt="CAC logo"
					height={56}
					width={56}
					priority
				/>
				<h1><b>When</b> CAC</h1>
			</button>
			<div>
				{round !== null && <RoundDisplay round={round} />}
			</div>
			<div>
				{points !== null && <PointsDisplay points={points} />}
			</div>
			{home &&
				<button className={`${styles.cleanButton} ${styles.green}`} onClick={() => router.push('/')}>
					<p>Voltar</p><h2>🏠</h2>
				</button>
			}
		</header>
	)
}