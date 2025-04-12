import styles from "./styles.module.css";

interface RoundDisplayProps {
	round: number
}

export default function RoundDisplay({ round }: RoundDisplayProps) {
	return (
		<div className={styles.numberDisplay}>
			Round {[1, 2, 3, 4, 5].map(number =>
				<div key={number} className={number == round ? styles.roundNumber : styles.number}>
					{number}
				</div>
			)}
		</div>
	)
}