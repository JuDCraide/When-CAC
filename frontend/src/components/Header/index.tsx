import Image from "next/image";
import styles from "./styles.module.css";
import bg from "../../../public/images/bg-dark.png";
import { ReactNode } from 'react';

interface HeaderProps {
	children?: ReactNode | null
} 

export default function Header({ children }: HeaderProps) {
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
				{children}
			</div>
			<div />
		</header>
	)
}