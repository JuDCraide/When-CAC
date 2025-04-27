import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { SetStateAction } from 'react';
import dayjs from 'dayjs';

const sx = {
	"& .MuiInputLabel-root.Mui-focused": { color: "var(--white)" }, //styles the label
	"& .MuiInputLabel-root": { color: "var(--white)" }, //styles the label
	"& .MuiOutlinedInput-root": {
		// "&": {
		// 	background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))"
		// },
		"& > fieldset": {
			borderColor: "var(--white)"
		},
		"& > .MuiOutlinedInput-notchedOutline": {
			borderColor: "var(--white)"
		},
		"&:hover > fieldset": {
			borderColor: "var(--white)",
			border: "2px solid var(--white)",
		},
		"&:active > fieldset": {
			borderColor: "var(--white)",
			border: "2px solid var(--white)",
		},
		"&:focus > fieldset": {
			borderColor: "var(--white)",
			border: "2px solid var(--white)",
		},
		"& .MuiSvgIcon-root": {
			color: "var(--white)"
		},
	},
}

interface SelectEpisodeProps {
	ep: number,
	setEp: (value: SetStateAction<number>) => void,
	latestEp: number,
}

const SelectEpisode: React.FC<SelectEpisodeProps> = ({ ep, setEp, latestEp }) => {
	const setEpisode = (n: number) => {
		if (n > latestEp) {
			n = latestEp
		} else if (n < 1) {
			n = 1
		}
		setEp(n)
	}

	return (
		<ThemeProvider theme={createTheme({
			palette: {
				mode: 'dark',
			},
		})}>
			<fieldset
				style={{
					border: "none",
					padding: "0",
					margin: "0",
					background: "transparent",
					width: "100%",
				}}
			>
				<div style={{ width: "100%", padding: "0 3%" }}>
					<Slider
						step={1} min={1} max={latestEp} value={ep}
						onChange={(e, value) => setEpisode(value as number)}
						sx={{
							color: 'var(--white)',
							'& .MuiSlider-track': {
								border: 'none',
							},
							'& .MuiSlider-thumb': {
								backgroundColor: 'var(--white)',
								border: '2px solid var(--dark-green)',
								'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
									boxShadow: 'inherit',
								},
								'&::before': {
									display: 'none',
								},
							},
						}}
					/>
				</div>
				<TextField
					id="outlined-controlled"
					label="Episódio"
					variant="outlined" sx={sx}
					type="number"
					value={ep}
					onChange={(e) => setEpisode(Number(e.target.value))}
					style={{ marginTop: "0.8em", width: "100%" }}
				/>
			</fieldset>
		</ThemeProvider>
	)
}

interface SelectDateProps {
	setDate: (value: SetStateAction<dayjs.Dayjs>) => void
}

const SelectDate: React.FC<SelectDateProps> = ({ setDate }) => {
	const setValueDate = (value: dayjs.Dayjs | null) => {
		setDate(dayjs(value))
	}

	return (
		<ThemeProvider
			theme={createTheme({
				palette: {
					mode: 'dark',
				},
			})}>
			<div style={{ marginTop: "1em" }}>
				<DatePicker
					onChange={(val) => setValueDate(val)}
					label="Data de publicação"
					minDate={dayjs("2013-01-01")}
					maxDate={dayjs()}
					openTo="year"
					sx={sx} />
			</div>
		</ThemeProvider>
	);
}

interface SeedDialogProps {
	seed: string,
	setSeed: (value: SetStateAction<string>) => void,
}

const SeedInput: React.FC<SeedDialogProps> = ({ seed, setSeed }) => {

	return (
		<ThemeProvider
			theme={createTheme({
				palette: {
					mode: 'dark',
				},
			})}>
			<div style={{ marginTop: "1em" }}>
				<TextField
					id="outlined-controlled"
					label="Seed"
					variant="outlined" sx={sx}
					value={seed}
					onChange={(e) => setSeed(e.target.value)}
					style={{ marginBottom: "0.8em", width: "100%" }}
				/>
			</div>
		</ThemeProvider>
	);
}

export { SelectEpisode, SelectDate, SeedInput };