import { MockSession } from '@/mocks/session';
import { transaction_default } from '@/mocks/transaction';
import { FinancialTransactionAction } from '@/services/protocol/types';
import { render, screen } from '@testing-library/react';

import TransactionCardTitle from '../transaction-card-title';

describe('Transaction Card Title', () => {
  test('renders the component', () => {
    render(
      <MockSession>
        <TransactionCardTitle
          amount={transaction_default.value}
          type={transaction_default.type}
          action={FinancialTransactionAction.TransactionFees}
        />
      </MockSession>
    );

    const cardComponent = screen.getByTestId('transaction__title');
    expect(cardComponent).toBeInTheDocument();
  });
  test('Display value', async () => {
    render(
      <MockSession>
        <TransactionCardTitle
          amount={transaction_default.value}
          type={transaction_default.type}
          action={FinancialTransactionAction.TransactionFees}
        />
      </MockSession>
    );

    const amountText = screen.getByTestId('transaction__title__amount');
    expect(amountText).toBeInTheDocument();
    const amount = amountText.textContent;
    expect(amount).toEqual('$0.30');
  });

  test.todo('Empty states');

  test.todo(
    `type === FinancialTransactionType.Earning && action === FinancialTransactionAction.IssuerEarnings`
  );
});
