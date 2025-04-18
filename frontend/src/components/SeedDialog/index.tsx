import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

import styles from "./styles.module.css";
import { SeedInput } from "../Inputs";
import { SetStateAction, useState } from "react";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface SeedDialogProps {
  openSeedDialog: boolean,
  onCloseDialog: () => void,
  onPlayGame: (seed: string) => void,
}

const SeedDialog: React.FC<SeedDialogProps> = ({ openSeedDialog, onCloseDialog, onPlayGame }) => {
  const [seed, setSeed] = useState("");

  function handlePlay(seed: string) {
    if (seed || seed !== "") {
      onPlayGame(seed)
    }
    onCloseDialog()
  }

  return (
    <Dialog open={openSeedDialog} onClose={onCloseDialog} disableScrollLock={true}>
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className={`${styles.greenContainer} ${geistSans.variable} ${styles.whiteText}`}
      >
        <h3>Informe a Seed</h3>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onCloseDialog}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          opacity: .8,
          color: "var(--white)"
        })}
      >
        X
      </IconButton>
      <DialogContent dividers className={styles.greenContainer}>
        <SeedInput seed={seed} setSeed={setSeed} />
      </DialogContent>
      <DialogActions className={styles.greenContainer}>
        <button className={`${styles.cleanbutton} ${styles.primary}`} onClick={() => handlePlay(seed)}>
          Começar o jogo
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default SeedDialog;
