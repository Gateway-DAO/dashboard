import { render, screen } from '@testing-library/react';

import Layout from '../layout';
import ExplorerHome from '../page';
import '@testing-library/jest-dom';

describe('Explorer Home', () => {
  it('renders a heading', () => {
    render(
      <Layout>
        <ExplorerHome />
      </Layout>
    );

    const heading = screen.getByRole('heading', {
      name: /Gateway/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
