import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';

import TransactionCardInfo from '../transaction-card-info';
import { SessionProvider } from 'next-auth/react';
import { session } from '@/mocks/session';
import { transaction_default } from '@/mocks/transaction';

describe('Transaction Card Info', () => {
  test('renders the component', () => {
    render(
      <SessionProvider session={session}>
        <TransactionCardInfo {...transaction_default} />
      </SessionProvider>
    );

    const cardComponent = screen.getByTestId('transaction__card');
    expect(cardComponent).toBeInTheDocument();
  });
  test('Display values', async () => {
    render(
      <SessionProvider session={session}>
        <TransactionCardInfo {...transaction_default} />
      </SessionProvider>
    );

    const titleText = screen.getByTestId('transaction__card__title');
    expect(titleText).toBeInTheDocument();
    const titleValue = titleText.textContent;
    expect(titleValue).toEqual('title');

    const idText = screen.getByTestId('external-link');
    expect(idText).toBeInTheDocument();
    const idValue = idText.textContent;
    expect(idValue).toEqual('12345');

    const dateText = screen.getByTestId('transaction__card__date');
    expect(dateText).toBeInTheDocument();
    const dateValue = dateText.textContent;
    expect(dateValue).toEqual('10/26/2023, 2:10 PM');

    const typeText = screen.getByTestId('transaction-status-chip');
    expect(typeText).toBeInTheDocument();
    const typeValue = typeText.textContent;
    expect(typeValue).toEqual('withdrawal');
  });

  test.todo('Empty states');
});
