import SwipeableDrawerMobile from '@/components/modal/swipeable-drawer-mobile';
import { theme } from '@/theme';

import { Modal, useMediaQuery } from '@mui/material';

type Props = {
  open?: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  title?: string;
  swipeableDrawer?: boolean;
};

export default function ModalImage({
  open = false,
  handleClose,
  handleOpen,
  title,
  swipeableDrawer = false,
}: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  return (
    <>
      {isMobile && swipeableDrawer ? (
        <SwipeableDrawerMobile
          open={open}
          handleClose={() => handleClose()}
          handleOpen={() => handleOpen()}
        >
          <p>Teste</p>
        </SwipeableDrawerMobile>
      ) : (
        <Modal open={open} onClose={() => handleClose()}>
          <p>bora</p>
        </Modal>
        // <Modal
        //   open={open}
        //   handleClose={() => handleClose()}
        //   modalTitle={`Modal ${title}`}
        //   modalDescription={`Modal ${title}`}
        // >
        //   <p>aqui tem uma modal</p>
        // </Modal>
      )}
    </>
  );
}
