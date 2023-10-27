import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';

import WalletHero from '../hero';

describe('Wallet page hero', () => {
  test('renders the component', () => {
    render(<WalletHero balance="$1" />);

    const walletComponent = screen.getByTestId('hero__wallet-balance');
    expect(walletComponent).toBeInTheDocument();
    const statementComponent = screen.getByTestId('hero__wallet-statement');
    expect(statementComponent).toBeInTheDocument();
  });
  test('Display values as default', async () => {
    render(<WalletHero balance="$1" />);

    const balanceText = screen.getByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('$1');
  });
  test('Hide on click', async () => {
    render(<WalletHero balance="$1" />);

    const button = screen.getByTestId('wallet-balance__button-toggle');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const text = screen.getByTestId('wallet-balance__balance');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('');

    const statementComponent = screen.getByTestId('hero__wallet-statement');
    expect(statementComponent).toBeInTheDocument();

    const lists = screen.getAllByTestId('wallet-statement__list');
    expect(lists).toHaveLength(2);

    const listsTotalValues = screen.getAllByTestId('list__total-value');
    expect(listsTotalValues).toHaveLength(2);

    expect(listsTotalValues[0]).toHaveTextContent('');
    expect(listsTotalValues[1]).toHaveTextContent('');
  });
  test('Display again after click twice', async () => {
    render(<WalletHero balance="$2" />);

    const button = screen.getByTestId('wallet-balance__button-toggle');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const text = screen.getByTestId('wallet-balance__balance');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('');

    const statementComponent = screen.getByTestId('hero__wallet-statement');
    expect(statementComponent).toBeInTheDocument();

    const lists = screen.getAllByTestId('wallet-statement__list');
    expect(lists).toHaveLength(2);

    const listsTotalValues = screen.getAllByTestId('list__total-value');
    expect(listsTotalValues).toHaveLength(2);

    expect(listsTotalValues[0]).toHaveTextContent('');
    expect(listsTotalValues[1]).toHaveTextContent('');

    await userEvent.click(button);
    expect(text).toHaveTextContent('$2');

    expect(listsTotalValues[0]).toHaveTextContent('$234.54');
    expect(listsTotalValues[1]).toHaveTextContent('$0.0');
  });
  test('Display $0 if without balance', () => {
    render(<WalletHero balance="" />);

    const balanceText = screen.getByTestId('wallet-balance__balance');
    expect(balanceText).toBeInTheDocument();
    const value = balanceText.textContent;
    expect(value).toEqual('$0');
  });
});
