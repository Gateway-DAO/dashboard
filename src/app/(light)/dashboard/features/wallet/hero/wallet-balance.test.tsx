import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WalletBalance from './wallet-balance';

describe('Wallet balance on hero', () => {
  test('renders the component', () => {
    render(<WalletBalance />);

    const walletComponent = screen.getByTestId('hero__wallet-balance');
    expect(walletComponent).toBeInTheDocument();
  });
  test('Check empty balance', () => {
    render(<WalletBalance />);
    const balanceText = screen.getByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('$0');
  });
  test('Check pass a balance value', () => {
    render(<WalletBalance value="$425.50" />);

    const balanceText = screen.getByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('$425.50');
  });
  test('Hide value on click', async () => {
    render(<WalletBalance value="$3227.25" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const balanceText = screen.getByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('');
  });

  test('Display value after hide', async () => {
    render(<WalletBalance value="$3227.25" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const balanceText = screen.getByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('');

    await userEvent.click(button);
    const valueAfter = balanceText.textContent;
    expect(valueAfter).toEqual('$3227.25');
  });
});
