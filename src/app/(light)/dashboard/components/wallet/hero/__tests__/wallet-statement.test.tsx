import { userEvent } from '@storybook/testing-library';
import { render, screen } from '@testing-library/react';

import WalletStatement from '../wallet-statement';

describe('Wallet statement', () => {
  test('renders the component', () => {
    render(<WalletStatement showValues />);

    const comp = screen.getByTestId('hero__wallet-statement');
    expect(comp).toBeInTheDocument();
  });
  test.todo('Check display values dinamically');
  test('Check collapse details', async () => {
    render(<WalletStatement showValues />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const lists = screen.getAllByTestId('list__details-items');
    expect(lists[0]).not.toBeVisible();
    expect(lists[1]).not.toBeVisible();

    await userEvent.click(button);
    expect(lists[0]).toBeVisible();
  });
});
