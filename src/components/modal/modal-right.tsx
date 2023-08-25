import * as React from 'react';

import { Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
};

export default function ModalRight({ children, open, handleClose }: Props) {
  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      scroll="paper"
      onClose={handleClose}
      sx={{
        width: { xs: '100%', md: '600px', lg: '720px' },
        left: 'auto',
        right: 16,
        bottom: 16,
        top: 16,
        borderRadius: 1,
        '& .MuiPaper-elevation': {
          borderRadius: 1,
        },
      }}
    >
      <Stack
        sx={{
          px: { xs: 3, md: 6 },
          pb: { xs: 3, md: 6 },
        }}
      >
        {children}
      </Stack>
    </Dialog>
  );
}
