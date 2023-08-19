import { theme } from '@/theme';

import { useMediaQuery } from '@mui/material';

import { ModalTabProps } from './ModalContentTypes';
import Modal from './modal';
import ModalTabsContent from './modal-tabs-content';
import SwipeableDrawerMobile from './swipeable-drawer-mobile';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  title?: string;
  tabs?: ModalTabProps[];
  swipeableDrawer?: boolean;
};

export default function ModalTabs({
  open = false,
  handleClose,
  handleOpen,
  title,
  tabs,
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
          {tabs && tabs.length > 0 && <ModalTabsContent tabs={tabs} />}
        </SwipeableDrawerMobile>
      ) : (
        <Modal
          open={open}
          handleClose={() => handleClose()}
          modalTitle={`Modal ${title}`}
          modalDescription={`Modal ${title}`}
        >
          {tabs && tabs.length > 0 && <ModalTabsContent tabs={tabs} />}
        </Modal>
      )}
    </>
  );
}
