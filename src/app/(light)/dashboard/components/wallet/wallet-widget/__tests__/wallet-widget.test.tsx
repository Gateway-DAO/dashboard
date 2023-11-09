import { SessionProvider } from 'next-auth/react';

import { session } from '@/mocks/session';
import { render, screen } from '@testing-library/react';

import WalletWidget from '../wallet-widget';

describe('Transaction', () => {
  test('renders the component', () => {
    render(
      <SessionProvider session={session}>
        <WalletWidget id="12345" />
      </SessionProvider>
    );

    const walletComponentComponent = screen.getByTestId('wallet-widget');
    expect(walletComponentComponent).toBeInTheDocument();
  });
  test('Display value', async () => {
    render(
      <SessionProvider session={session}>
        <WalletWidget id="12345" />
      </SessionProvider>
    );

    const valueText = screen.getByTestId('wallet-widget__value');
    expect(valueText).toBeInTheDocument();
    const value = valueText.textContent;
    expect(value).toEqual('$5.00');
  });
  test('Display button', async () => {
    render(
      <SessionProvider session={session}>
        <WalletWidget id="12345" />
      </SessionProvider>
    );

    const valueText = screen.getByTestId('wallet-widget__view-more');
    expect(valueText).toBeInTheDocument();
  });
});
