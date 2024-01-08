import { SessionProvider } from 'next-auth/react';

import { DATE_FORMAT } from '@/constants/date';
import { session } from '@/mocks/session';
import { transaction_default } from '@/mocks/transaction';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

import TransactionCardInfo from '../transaction-card-info';
describe('Transaction Card Info', () => {
  test('renders the component', () => {
    render(
      <SessionProvider session={session}>
        <TransactionCardInfo
          title={transaction_default.action}
          type={transaction_default.type}
          id={transaction_default.id}
          date={transaction_default.createdAt}
        />
      </SessionProvider>
    );

    const cardComponent = screen.getByTestId('transaction__card');
    expect(cardComponent).toBeInTheDocument();
  });
  test('Display values', async () => {
    render(
      <SessionProvider session={session}>
        <TransactionCardInfo
          title={transaction_default.action}
          type={transaction_default.type}
          transactionId={transaction_default.id}
          date={transaction_default.createdAt}
        />
      </SessionProvider>
    );

    const titleText = screen.getByTestId('transaction__card__title');
    expect(titleText).toBeInTheDocument();
    const titleValue = titleText.textContent;
    expect(titleValue).toEqual('PDA issuance cost');

    const idText = screen.getByTestId('external-link');
    expect(idText).toBeInTheDocument();
    const idValue = idText.textContent;
    expect(idValue).toEqual('12345');

    const dateText = screen.getByTestId('transaction__card__date');
    expect(dateText).toBeInTheDocument();
    const dateValue = dateText.textContent;
    const date = dayjs(dateValue).format(DATE_FORMAT);
    expect(dateValue).toEqual(date);

    const typeText = screen.getByTestId('transaction-status-chip');
    expect(typeText).toBeInTheDocument();
    const typeValue = typeText.textContent;
    expect(typeValue).toEqual('withdraw');
  });

  test.todo('Empty states');
});
