import { MockSession } from '@/mocks/session';
import { transaction_default } from '@/mocks/transaction';
import { render, screen } from '@testing-library/react';

import { Transaction } from '../transaction';

describe('Transaction', () => {
  test('renders the component', () => {
    render(
      <MockSession>
        <Transaction transaction={transaction_default} />
      </MockSession>
    );

    const titleComponent = screen.getByTestId('transaction__title');
    expect(titleComponent).toBeInTheDocument();
    const cardComponent = screen.getByTestId('transaction__card');
    expect(cardComponent).toBeInTheDocument();
  });
});
