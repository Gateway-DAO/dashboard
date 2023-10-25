'use client';
import { useRouter } from 'next-nprogress-bar';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import routes from '@/constants/routes';
import { useToggle } from '@react-hookz/web';

import { Button } from '@mui/material';
import { Stack } from '@mui/system';

import { Transaction } from '../transaction';

export function TransactionModal() {
  const router = useRouter();
  const [openTransaction, setOpenTransaction] = useToggle(false);

  const toggleModal = () => {
    if (openTransaction) {
      router.push(routes.dashboardUserWallet, { scroll: false });
    } else {
      router.push('#transaction', { scroll: false });
    }
    setOpenTransaction();
  };

  return (
    <>
      <Button onClick={toggleModal}>Toggle Modal</Button>
      <ModalRight open={openTransaction} onClose={toggleModal}>
        <ModalHeader onClose={toggleModal} />
        <Stack sx={{ pt: 3 }}>
          <Transaction id="hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVs" />
        </Stack>
      </ModalRight>
    </>
  );
}
