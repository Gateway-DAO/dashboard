import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import ShareCopyFormField from '../asset/[id]/components/share-copy/share-copy-form-fields';

describe('Dashboard User Home', () => {
  test.skip('renders a heading', () => {
    render(<ShareCopyFormField />);

    const heading = screen.getByRole('heading', {
      name: /Gateway/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
