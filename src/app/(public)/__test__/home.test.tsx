import { render, screen } from '@testing-library/react'

import Layout from '../layout'
import Page from '../page'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Layout><Page /></Layout>)

    const heading = screen.getByRole('heading', {
      name: /Gateway/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
