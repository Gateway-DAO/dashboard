import { render, screen } from '@testing-library/react';

import TransactionStatusChip from '../transaction-status-chip';

type TransactionStatus = 'EARNING' | 'EXPENSE' | 'DEPOSIT' | 'WITHDRAWAL';

describe('Transaction Status Chip', () => {
  const transactionStatus: TransactionStatus = 'EARNING';
  test('renders the component', () => {
    render(<TransactionStatusChip status={transactionStatus} />);

    const cardComponent = screen.getByTestId('transaction-status-chip');
    expect(cardComponent).toBeInTheDocument();
  });
  test('Display default value', async () => {
    render(<TransactionStatusChip status={transactionStatus} />);

    const valueText = screen.getByTestId('transaction-status-chip');
    expect(valueText).toBeInTheDocument();
    const value = valueText.textContent;
    expect(value).toEqual('earning');
  });
  test('Display value: "Expense"', async () => {
    render(<TransactionStatusChip status="EXPENSE" />);

    const valueText = screen.getByTestId('transaction-status-chip');
    expect(valueText).toBeInTheDocument();
    const value = valueText.textContent;
    expect(value).toEqual('expense');
  });
  test('Display value: "DEPOSIT"', async () => {
    render(<TransactionStatusChip status="DEPOSIT" />);

    const valueText = screen.getByTestId('transaction-status-chip');
    expect(valueText).toBeInTheDocument();
    const value = valueText.textContent;
    expect(value).toEqual('deposit');
  });
  test('Display value: "WITHDRAWAL"', async () => {
    render(<TransactionStatusChip status="WITHDRAWAL" />);

    const valueText = screen.getByTestId('transaction-status-chip');
    expect(valueText).toBeInTheDocument();
    const value = valueText.textContent;
    expect(value).toEqual('withdrawal');
  });
});
