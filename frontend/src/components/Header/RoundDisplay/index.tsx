import { SetStateAction } from "react";
import styles from "./styles.module.css";

interface RoundDisplayProps {
	round: number
}

export default function RoundDisplay({ round }: RoundDisplayProps) {
	return (
		<div className={styles.roundDisplay}>
			Round {[1, 2, 3, 4, 5].map(number =>
				<div key={number} className={number == round ? styles.roundNumber : styles.number}>
					{number}
				</div>
			)}
		</div>
	)
}

interface ClickableRoundDisplayProps {
	round: number,
	setRound: (value: SetStateAction<number>) => void
}

export function ClickableRoundDisplay({ round, setRound }: ClickableRoundDisplayProps) {

	return (
		<div className={styles.roundDisplay}>
			Round {[1, 2, 3, 4, 5].map(number =>
				<button
					key={number}
					className={number == round ? styles.roundNumber : styles.number}
					onClick={() => setRound(number)}
				>
					{number}
				</button>
			)}
		</div>
	)
}