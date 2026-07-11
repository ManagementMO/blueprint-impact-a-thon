import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('Belonging Loop prototype', () => {
  it('moves a member from a wish to a transparent event match', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'A day that feels like yours.' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Show my match' }))

    expect(
      screen.getByRole('heading', { name: 'Saturday Trail Circle' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Mobility support has not been arranged')).toBeInTheDocument()
  })

  it('turns an unmatched interest into an anonymous group wish', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /music/i }))
    await user.click(screen.getByRole('button', { name: 'Show my match' }))

    expect(
      screen.getByRole('heading', {
        name: 'We do not see a close music match for Saturday yet.',
      }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Share this wish' }))

    expect(screen.getByText('Wish shared anonymously')).toBeInTheDocument()
  })

  it('reflects a host support-status update in the live preview', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Open host workspace' }))
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Support status' }),
      'Coordinator reviewing',
    )

    expect(screen.getByText('Support: Coordinator reviewing')).toBeInTheDocument()
  })
})
