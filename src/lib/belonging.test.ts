import { describeEventFit } from './belonging'
import { describe, expect, it } from 'vitest'

describe('describeEventFit', () => {
  it('keeps an unarranged support need visible while explaining the event fit', () => {
    const result = describeEventFit(
      {
        interests: ['nature'],
        preferredDay: 'Saturday',
        groupPreference: 'small',
        needs: ['quiet-break', 'mobility-support'],
      },
      {
        interests: ['nature', 'wellness'],
        day: 'Saturday',
        groupSize: 'small',
        accessFacts: {
          'quiet-break': 'confirmed',
          'mobility-support': 'not-arranged',
        },
      },
    )

    expect(result.reasons).toEqual(
      expect.arrayContaining([
        'Nature and fresh air',
        'Saturday timing',
        'Small-group setting',
        'Quiet break space confirmed',
      ]),
    )
    expect(result.blockers).toEqual(['Mobility support has not been arranged'])
    expect(result.score).toBeGreaterThan(70)
  })
})
