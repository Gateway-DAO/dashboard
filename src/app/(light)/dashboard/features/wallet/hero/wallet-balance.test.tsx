import { render, screen } from '@testing-library/react';

import WalletBalance from './wallet-balance';

describe('Wallet balance on hero', () => {
  test('renders the component', () => {
    render(<WalletBalance valueVisible={true} setVisible={undefined} />);

    const walletComponent = screen.getByTestId('hero__wallet-balance');
    expect(walletComponent).toBeInTheDocument();
  });
  test('Check empty balance', () => {
    render(<WalletBalance valueVisible={true} setVisible={undefined} />);
    const balanceText = screen.getByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('$0');
  });
  test('Check pass a balance value', () => {
    render(
      <WalletBalance
        value="$425.50"
        valueVisible={true}
        setVisible={undefined}
      />
    );

    const balanceText = screen.getByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('$425.50');
  });
  test('Hide value with false prop', async () => {
    render(
      <WalletBalance
        value="$3227.25"
        valueVisible={false}
        setVisible={undefined}
      />
    );

    const balanceText = await screen.findByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('');
  });
});
