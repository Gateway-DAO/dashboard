import React from 'react';

import { getPrivateApi } from '@/services/protocol/api';
import { render, screen } from '@testing-library/react';

import PDAPage from './page';

jest.mock('@/services/protocol/api', () => ({
  getPrivateApi: jest.fn(),
}));
jest.mock('./components/pda-item', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('PDAPage', () => {
  it('renders PDAPage with data', async () => {
    (getPrivateApi as jest.Mock).mockResolvedValueOnce({
      pda: jest.fn().mockResolvedValueOnce({
        PDAbyId: {
          dataAsset: {
            title: 'Test Title',
            description: 'Test Description',
          },
        },
      }),
    });

    render(<PDAPage params={{ id: 'test-id' }} />);

    expect(
      await screen.findByText('Test Title PDA - Gateway Network')
    ).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders PDAPage without data', async () => {
    (getPrivateApi as jest.Mock).mockResolvedValueOnce(null);

    render(<PDAPage params={{ id: 'test-id' }} />);

    expect(await screen.findByText('No Data')).toBeInTheDocument();
  });
});
