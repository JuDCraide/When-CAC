import Image from "next/image";
import styles from "./styles.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<div>
				<Image
					className={styles.logo}
					src="/images/logo-no-bg.png"
					alt="CAC logo"
					height={56}
					width={56}
					priority
				/>
				<h1><b>When</b> CAC</h1>
			</div>
		</header>
	)
}