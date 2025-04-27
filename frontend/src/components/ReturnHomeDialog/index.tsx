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

interface ReturnHomeDialogProps {
  openReturnHomeDialog: boolean,
  onCloseDialog: () => void,
}

const ReturnHomeDialog: React.FC<ReturnHomeDialogProps> = ({ openReturnHomeDialog, onCloseDialog }) => {
  const router = useRouter();
  function onReturnHome() {
    router.push('/')
  }

  return (
    <Dialog open={openReturnHomeDialog} onClose={onCloseDialog} disableScrollLock={true}>
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className={`${styles.greenContainer} ${geistSans.variable} ${styles.whiteText}`}
      >
        <h3>Tem certeza que deseja voltar?</h3>
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
        <p className={styles.whiteText}>Se você estiver no meio do jogo, voltar significa abandonar</p>
        <p className={styles.whiteText}>a partida. Perdendo o progresso até então.</p>
      </DialogContent>
      <DialogActions className={styles.greenContainer}>
         <button className={`${styles.cleanbutton} ${styles.primary}`} onClick={() => onCloseDialog()}>
          Continuar jogo
        </button>
        <button className={`${styles.cleanbutton} ${styles.primary}`} onClick={() => onReturnHome()}>
          Voltar 🏠
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default ReturnHomeDialog;
