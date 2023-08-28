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
  onClose: () => void;
};

export default function ModalRight({ children, open, onClose }: Props) {
  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      scroll="paper"
      onClose={onClose}
      sx={{
        width: { xs: '100%', md: '600px', lg: '646px' },
        left: 'auto',
        right: { xs: 0, md: 16 },
        bottom: { xs: 0, md: 16 },
        top: { xs: 0, md: 16 },
        borderRadius: { xs: 0, md: 1 },
        '& .MuiPaper-elevation': {
          borderRadius: { xs: 0, md: 1 },
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
