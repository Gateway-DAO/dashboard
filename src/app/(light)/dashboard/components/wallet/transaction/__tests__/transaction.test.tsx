import { render, screen } from '@testing-library/react';

import { SessionProvider } from 'next-auth/react';
import { session } from '@/mocks/session';
import { transaction_default } from '@/mocks/transaction';
import { Transaction } from '../transaction';

describe('Transaction', () => {
  test('renders the component', () => {
    render(
      <SessionProvider session={session}>
        <Transaction {...transaction_default} />
      </SessionProvider>
    );

    const titleComponent = screen.getByTestId('transaction__title');
    expect(titleComponent).toBeInTheDocument();
    const cardComponent = screen.getByTestId('transaction__card');
    expect(cardComponent).toBeInTheDocument();
  });
});
