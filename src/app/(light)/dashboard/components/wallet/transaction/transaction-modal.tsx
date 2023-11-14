'use client';
import { useRouter } from 'next-nprogress-bar';
import { useMemo } from 'react';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import routes from '@/constants/routes';
import {
  FinancialTransactionAction,
  FinancialTransactionType,
} from '@/services/protocol/types';

import { Stack } from '@mui/system';

import { Transaction } from './transaction';

export type TransactionDetail = {
  id: string;
  value: number;
  type: FinancialTransactionType;
  transactionId: string;
  createdAt: any;
  action: FinancialTransactionAction;
};

type Props = {
  open: boolean;
  onClose: any;
  transactionDetail: TransactionDetail;
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
