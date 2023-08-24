import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

type ConfirmDialogProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  positiveAnswer: string;
  negativeAnswer: string;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    title,
    children,
    open,
    setOpen,
    onConfirm,
    positiveAnswer,
    negativeAnswer,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      maxWidth="xs"
    >
      <DialogTitle id="confirm-dialog" sx={{ minWidth: { xs: 200, md: 400 } }}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
          color="primary"
          sx={{
            flexGrow: 1,
          }}
        >
          {negativeAnswer}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
          sx={{
            flexGrow: 1,
          }}
        >
          {positiveAnswer}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
