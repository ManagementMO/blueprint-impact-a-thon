export type AccessState = 'confirmed' | 'reported' | 'not-arranged' | 'not-known'

export interface Wish {
  interests: string[]
  preferredDay: string
  groupPreference: 'small' | 'medium' | 'large'
  needs: string[]
}

export interface EventCandidate {
  interests: string[]
  day: string
  groupSize: 'small' | 'medium' | 'large'
  accessFacts: Record<string, AccessState>
}

export interface EventFit {
  score: number
  reasons: string[]
  blockers: string[]
}

const readableInterest: Record<string, string> = {
  nature: 'Nature and fresh air',
  wellness: 'Wellness and movement',
  art: 'Creative time together',
  music: 'Music and shared rhythm',
}

const readableNeed: Record<string, string> = {
  'quiet-break': 'Quiet break space',
  'mobility-support': 'Mobility support',
}

export function describeEventFit(wish: Wish, event: EventCandidate): EventFit {
  const reasons: string[] = []
  const blockers: string[] = []
  let score = 0

  for (const interest of wish.interests) {
    if (event.interests.includes(interest)) {
      reasons.push(readableInterest[interest] ?? interest)
      score += 30
    }
  }

  if (event.day === wish.preferredDay) {
    reasons.push(event.day + ' timing')
    score += 20
  }

  if (event.groupSize === wish.groupPreference) {
    reasons.push(
      event.groupSize[0].toUpperCase() + event.groupSize.slice(1) + '-group setting',
    )
    score += 20
  }

  for (const need of wish.needs) {
    const state = event.accessFacts[need]
    const label = readableNeed[need] ?? need

    if (state === 'confirmed') {
      reasons.push(label + ' confirmed')
      score += 15
    }

    if (state === 'reported') {
      reasons.push(label + ' reported by a partner')
      score += 8
    }

    if (state === 'not-arranged') {
      blockers.push(label + ' has not been arranged')
    }

    if (state === 'not-known') {
      blockers.push(label + ' is not known yet')
    }
  }

  return {
    score: Math.min(score, 100),
    reasons,
    blockers,
  }
}
