import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('Belonging Loop accessible calendar', () => {
  it('starts with one visual onboarding decision', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: 'How do you like to use this app?' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /pictures/i }))
    expect(screen.getByRole('heading', { name: 'What do you like to do?' })).toBeInTheDocument()
  })

  it('opens a recommended event and saves it to My Week', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /skip setup/i }))
    await user.click(screen.getByRole('button', { name: 'Accessible Nature Walk' }))
    expect(screen.getByRole('heading', { name: 'Accessible Nature Walk' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /save to my week/i }))
    await user.click(screen.getByRole('button', { name: 'My Week' }))
    expect(screen.getByText('Accessible Nature Walk')).toBeInTheDocument()
  })

  it('switches to PECS choices without requiring typing', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /skip setup/i }))
    await user.click(screen.getByRole('button', { name: 'PECS mode' }))
    expect(screen.getByText('PECS is ON')).toBeInTheDocument()
    expect(screen.getByText('Tap a picture')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /outdoors/i })).toBeInTheDocument()
  })

  it('shows a slowed audio state when a speaker control is used', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /skip setup/i }))
    await user.click(screen.getByRole('button', { name: 'Listen' }))
    await user.click(screen.getByRole('button', { name: 'Listen to Home' }))
    expect(screen.getByText('Speaking slowly')).toBeInTheDocument()
  })

  it('opens one color vision choice screen', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /skip setup/i }))
    await user.click(screen.getByRole('button', { name: 'Color' }))
    expect(screen.getByRole('heading', { name: 'Choose your vision type' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /red-green/i }))
    expect(document.documentElement.dataset.colorMode).toBe('red-green')
  })
})
