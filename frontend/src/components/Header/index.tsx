import Image from "next/image";
import styles from "./styles.module.css";
import bg from "../../../public/images/bg-dark.png";
import RoundDisplay from "./RoundDisplay";
import PointsDisplay from "./PointsDisplay";

interface HeaderProps {
	round?: number | null,
	points?: number | null,
}

export default function Header({ round = null, points = null }: HeaderProps) {
	return (
		<header className={styles.header}
			style={{
				backgroundImage: `url(${bg.src})`,
			}}
		>
			<div className={styles.logo}>
				<Image
					src="/images/logo-no-bg.png"
					alt="CAC logo"
					height={56}
					width={56}
					priority
				/>
				<h1><b>When</b> CAC</h1>
			</div>
			<div>
				{round !== null && <RoundDisplay round={round} />}
			</div>
			<div>
				{points !== null && <PointsDisplay points={points} />}
			</div>
		</header>
	)
}