import Image from "next/image";
import styles from "./styles.module.css";
import bg from "../../../public/images/bg-dark.png";

interface NumberDisplayProps {
	round: number
}

export default function NumberDisplay({ round }: NumberDisplayProps) {
	return (
		<div className={styles.numberDisplay}>
			Round {[1, 2, 3, 4, 5].map(number => {
				if (number == round) {
					return (
						<div className={styles.roundNumber}>
							{number}
						</div>
					)
				} else {
					return (
						<div className={styles.number}>
							{number}
						</div>
					)
				}
			})}
		</div>
	)
}