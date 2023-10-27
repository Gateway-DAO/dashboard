import { SessionProvider } from 'next-auth/react';

import { session } from '@/mocks/session';
import { transaction_default } from '@/mocks/transaction';
import { render, screen } from '@testing-library/react';

import TransactionCardTitle from '../transaction-card-title';

describe('Transaction Card Title', () => {
  test('renders the component', () => {
    render(
      <SessionProvider session={session}>
        <TransactionCardTitle {...transaction_default} />
      </SessionProvider>
    );

    const cardComponent = screen.getByTestId('transaction__title');
    expect(cardComponent).toBeInTheDocument();
  });
  test('Display value', async () => {
    render(
      <SessionProvider session={session}>
        <TransactionCardTitle {...transaction_default} />
      </SessionProvider>
    );

    const amountText = screen.getByTestId('transaction__title__amount');
    expect(amountText).toBeInTheDocument();
    const amount = amountText.textContent;
    expect(amount).toEqual('$0.30');
  });

  test.todo('Empty states');
});
