'use client';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { My_TransactionsQuery } from '@/services/protocol/types';

import { Stack } from '@mui/system';

import { Transaction } from './transaction';

type Props = {
  open: boolean;
  onClose: any;
  transactionDetail: My_TransactionsQuery['myFinancialTransactions'][0];
};

export function TransactionModal({
  open = false,
  onClose,
  transactionDetail,
}: Props) {
  return (
    <>
      <ModalRight open={open} onClose={onClose}>
        <ModalHeader onClose={onClose} />
        <Stack sx={{ pt: 3 }}>
          <Transaction transaction={transactionDetail} />
        </Stack>
      </ModalRight>
    </>
  );
}
