/* eslint-disable @next/next/no-img-element */
'use client';
import SwipeableDrawerMobile from '@/components/modal/swipeable-drawer-mobile/swipeable-drawer-mobile';

import { CloseOutlined } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

type Props = {
  open?: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  image: string;
  swipeableDrawer?: boolean;
};

export default function ModalImage({
  open = false,
  handleClose,
  handleOpen,
  image,
  swipeableDrawer = false,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  return (
    <>
      {isMobile && swipeableDrawer ? (
        <SwipeableDrawerMobile
          open={open}
          handleClose={() => handleClose()}
          handleOpen={() => handleOpen()}
        >
          <Box sx={{ width: { xs: '250px', md: '396px' }, margin: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <IconButton
                sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
                onClick={() => handleClose()}
              >
                <CloseOutlined />
              </IconButton>
            </Box>
            <DialogContent>
              <img
                src={image}
                width="100%"
                alt="PDA image"
                style={{ borderRadius: 16 }}
              />
            </DialogContent>
          </Box>
        </SwipeableDrawerMobile>
      ) : (
        <Dialog open={open} onClose={() => handleClose()}>
          <Paper
            direction="column"
            elevation={5}
            component={Stack}
            sx={{
              px: { xs: 2, lg: 3 },
              py: { xs: 2, lg: 3 },
              height: '100%',
              width: { md: '100%', xs: '444px' },
              display: 'flex',
              borderRadius: 1,
            }}
          >
            <Box sx={{ width: { xs: '250px', md: '396px' }, margin: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton
                  sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
                  onClick={() => handleClose()}
                >
                  <CloseOutlined />
                </IconButton>
              </Box>
              <DialogContent>
                <img
                  src={image}
                  width="100%"
                  alt="PDA image"
                  style={{ borderRadius: 16 }}
                />
              </DialogContent>
            </Box>
          </Paper>
        </Dialog>
      )}
    </>
  );
}
