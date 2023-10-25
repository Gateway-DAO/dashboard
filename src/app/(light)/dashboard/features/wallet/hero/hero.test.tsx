import { render, screen } from '@testing-library/react';

import WalletHero from './hero';

describe('Wallet page hero', () => {
  test('renders the component', () => {
    render(<WalletHero />);

    const walletComponent = screen.getByTestId('hero__wallet-balance');
    expect(walletComponent).toBeInTheDocument();
    const statementComponent = screen.getByTestId('hero__wallet-statement');
    expect(statementComponent).toBeInTheDocument();
  });
});
