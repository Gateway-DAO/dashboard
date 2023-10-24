import { render, screen } from '@testing-library/react';

import WalletBalance from './hero/wallet-balance';

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
});
