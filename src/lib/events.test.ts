import { describe, expect, it } from 'vitest'
import { events, recommendedEvents } from './events'

describe('event catalog', () => {
  it('contains three visual event examples with clear attendance states', () => {
    expect(events).toHaveLength(3)
    expect(events.map((event) => event.registration)).toEqual(
      expect.arrayContaining(['Sign up first', 'Yes, just come']),
    )
  })

  it('prioritizes the small, outdoor event for the default recommendation', () => {
    expect(recommendedEvents[0].title).toBe('Accessible Nature Walk')
  })
})
