import Image from "next/image";
import styles from "./styles.module.css";
import bg from "../../../public/images/bg-dark.png";
import RoundDisplay from "./RoundDisplay";
import PointsDisplay from "./PointsDisplay";
import { useRouter } from "next/router";
import { CSSProperties, useState } from "react";
import ReturnHomeDialog from "../ReturnHomeDialog";

interface HeaderProps {
	round?: number | null,
	points?: number | null,
	home?: boolean,
	style?: CSSProperties | null,
	checkHome?: boolean,
}

export default function Header({ round = null, points = null, home = false, checkHome=true, style = null }: HeaderProps) {
	const router = useRouter();

	const [openReturnHomeDialog, setOpenReturnHomeDialog] = useState(false);

	function onClick() {
		if (home && checkHome) {
			setOpenReturnHomeDialog(true);
			return;
		}
		router.push("/");
	}

	return (
		<header className={styles.header}
			style={style != null ? style : {
				backgroundImage: `url(${bg.src})`,
			}}
		>
			<button className={`${styles.cleanButton} ${styles.logo}`} onClick={onClick}>
				<Image
					src="/images/logo-no-bg.png"
					alt="CAC logo"
					height={52}
					width={52}
					priority
					style={{ 
						background:"var(--dark-green)",
						border: "1px solid #fff", 
						borderRadius: "50%" 
					}}
				/>
				<h1><b>When</b> CAC</h1>
			</button>
			{round !== null &&
				<div className={styles.rounds}>
					<RoundDisplay round={round} />
				</div>
			}
			{points !== null &&
				<div>
					<PointsDisplay points={points} />
				</div>
			}
			{home &&
				<button className={`${styles.cleanButton} ${styles.green}`} onClick={onClick}>
					<p>Voltar</p><h2>🏠</h2>
				</button>
			}
			<ReturnHomeDialog openReturnHomeDialog={openReturnHomeDialog} onCloseDialog={() => setOpenReturnHomeDialog(false)} />
		</header>
	)
}