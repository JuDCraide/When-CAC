import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

import styles from "./styles.module.css";

import { Geist } from "next/font/google";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface ErrorDialogProps {
  error: string,
  seed: string | null,
  openErrorDialog: boolean,
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ openErrorDialog, seed, error }) => {
  const router = useRouter();
  function onCloseDialog() {
    router.push('/')
  }

  return (
    <Dialog open={openErrorDialog} onClose={onCloseDialog} disableScrollLock={true}>
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className={`${styles.greenContainer} ${geistSans.variable} ${styles.whiteText}`}
      >
        <h3>Desculpe, um erro ocorreu</h3>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onCloseDialog}
        sx={() => ({
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
        <p className={styles.whiteText}> Erro: {error}</p>
        {seed && <p className={styles.whiteText}>Seed atual: {seed}</p>}
      </DialogContent>
      <DialogActions className={styles.greenContainer}>
        <button className={`${styles.cleanbutton} ${styles.primary}`} onClick={() => onCloseDialog()}>
          Voltar
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorDialog;
