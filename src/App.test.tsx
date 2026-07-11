import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('Belonging Loop accessible calendar', () => {
  it('opens a recommended event and saves it to My Week', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /recommended/i }))
    await user.click(screen.getByRole('button', { name: 'Accessible Nature Walk' }))
    expect(screen.getByRole('heading', { name: 'Accessible Nature Walk' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /save to my week/i }))
    await user.click(screen.getByRole('button', { name: 'My Week' }))
    expect(screen.getByText('Accessible Nature Walk')).toBeInTheDocument()
  })

  it('switches to PECS choices without requiring typing', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'PECS mode' }))
    expect(screen.getByText('Tap a picture')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /outdoors/i })).toBeInTheDocument()
  })

  it('shows a slowed audio state when a speaker control is used', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Audio First' }))
    await user.click(screen.getAllByRole('button', { name: /listen/i })[0])
    expect(screen.getByText('Speaking slowly')).toBeInTheDocument()
  })
})
