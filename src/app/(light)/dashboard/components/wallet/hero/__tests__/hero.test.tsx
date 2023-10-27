import { useWalletStore } from '@/app/(light)/dashboard/stores/wallet.store';
import { userEvent } from '@storybook/testing-library';
import { render, renderHook, screen } from '@testing-library/react';

import WalletHero from '../hero';

const svgIcon =
  '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1c8ydnh-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MoreHorizOutlinedIcon"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>';

describe('Wallet page hero', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    const { result } = renderHook(() => useWalletStore((state) => state));
    result.current.showValues = true;
  });

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

    expect(listsTotalValues[0]).toContainHTML(svgIcon);
    expect(listsTotalValues[1]).toContainHTML(svgIcon);
  });
  test('Display again after click twice', async () => {
    render(<WalletHero balance="$2" />);

    const button = screen.getByTestId('wallet-balance__button-toggle');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const text = screen.getByTestId('wallet-balance__balance');
    expect(text).toBeInTheDocument();
    expect(text).toContainHTML(svgIcon);

    const statementComponent = screen.getByTestId('hero__wallet-statement');
    expect(statementComponent).toBeInTheDocument();

    const lists = screen.getAllByTestId('wallet-statement__list');
    expect(lists).toHaveLength(2);

    const listsTotalValues = screen.getAllByTestId('list__total-value');
    expect(listsTotalValues).toHaveLength(2);

    expect(listsTotalValues[0]).toContainHTML(svgIcon);
    expect(listsTotalValues[1]).toContainHTML(svgIcon);

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
