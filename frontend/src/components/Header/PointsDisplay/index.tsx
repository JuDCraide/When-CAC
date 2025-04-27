import styles from "./styles.module.css";

interface PointsDisplayProps {
	points: number
}

export default function PointsDisplay({ points }: PointsDisplayProps) {
	return (
		<div className={styles.pointsDisplay}>
			<p>Pontos </p><h3>{points}</h3><p> /1000</p>
		</div>
	)
}