export type Event = {
  id: 'nature' | 'art' | 'music'
  title: string
  category: string
  day: string
  time: string
  place: string
  cost: string
  bus: string
  group: string
  noise: string
  access: string
  support: string
  registration: 'Sign up first' | 'Yes, just come'
  image: string
  reason: string
  short: string
  plain: string
  arrival: { icon: string; title: string; detail: string; image: string }[]
  journey?: { route: string; leave: string; duration: string; steps: string[] }
}

export const events: Event[] = [
  {
    id: 'nature', title: 'Accessible Nature Walk', category: 'Outdoors', day: 'Saturday', time: '10:00 AM - 11:30 AM', place: 'Waterloo Park', cost: 'Free', bus: 'Route 7 stops nearby', group: 'Small group', noise: 'Quiet', access: 'Step-free path reported', support: 'Mobility support can be requested', registration: 'Sign up first',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85',
    reason: 'Recommended because you like outdoor activities and small groups.',
    short: 'A calm walk with time for breaks.', plain: 'We will walk together. We will go slowly. You can take a break or leave anytime. Jordan can help with the path.',
    arrival: [
      { icon: '🚪', title: 'Enter by the park gate', detail: 'Use the wide gate beside the bus stop.', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80' },
      { icon: '👋', title: 'Meet Jordan', detail: 'Jordan is at the yellow welcome table.', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=400&q=80' },
      { icon: '🪑', title: 'See the quiet bench', detail: 'The quiet bench is beside the garden.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { icon: '🚶', title: 'Start when ready', detail: 'Choose your own pace. Take a break anytime.', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80' },
    ],
    journey: { route: 'Bus 8 to Waterloo Park', leave: 'Leaves at 9:38 AM', duration: '20 min ride · one bus · no transfers', steps: ['Leave home', 'Walk 5 min', 'Bus 8', 'Walk 3 min', 'Blue entrance', 'Jordan meets you'] },
  },
  {
    id: 'art', title: 'Community Art Afternoon', category: 'Art', day: 'Wednesday', time: '2:00 PM - 3:30 PM', place: 'Victoria Hills Centre', cost: 'Free', bus: 'Route 4 at the door', group: '12 people', noise: 'Low noise', access: 'Indoor and step-free', support: 'Staff support available', registration: 'Yes, just come',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85',
    reason: 'Recommended because you like making things in a calm room.',
    short: 'Paint, draw, or make a craft.', plain: 'We will make art together. You can paint, draw, or use craft supplies. A staff person can help you.',
    arrival: [
      { icon: '🚪', title: 'Use the front door', detail: 'The door has a flat entrance.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80' },
      { icon: '👋', title: 'Say hello to Priya', detail: 'Priya has name tags at the table.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      { icon: '🎨', title: 'Pick your supplies', detail: 'Choose paint, paper, or a craft kit.', image: 'https://images.unsplash.com/photo-1452802447250-d2cb1bc26d1e?auto=format&fit=crop&w=400&q=80' },
    ],
    journey: { route: 'Bus 4 to Victoria Hills', leave: 'Leaves at 1:26 PM', duration: '14 min ride · one bus · no transfers', steps: ['Leave home', 'Walk 4 min', 'Bus 4', 'Front door', 'Meet Priya'] },
  },
  {
    id: 'music', title: 'Music and Games Night', category: 'Music', day: 'Friday', time: '6:00 PM - 8:00 PM', place: 'Kitchener Community Hall', cost: '$5', bus: 'Route 8 until 9 PM', group: '20 people', noise: 'Moderate noise', access: 'Ramp entrance confirmed', support: 'Support people are free', registration: 'Sign up first',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85',
    reason: 'Recommended because you enjoy music and social games.',
    short: 'Listen to music and play simple games.', plain: 'We will listen to music. We will play games at tables. The room may be busy. You can use headphones or take a break.',
    arrival: [
      { icon: '🚪', title: 'Use the ramp entrance', detail: 'The ramp is on the side of the hall.', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80' },
      { icon: '🧥', title: 'Put your coat away', detail: 'Coat hooks are next to the welcome table.', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80' },
      { icon: '🎲', title: 'Choose a game or music', detail: 'You can watch first if you want.', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80' },
    ],
    journey: { route: 'Bus 12 to Community Hall', leave: 'Leaves at 5:24 PM', duration: '18 min ride · one bus · no transfers', steps: ['Leave home', 'Walk 5 min', 'Bus 12', 'Ramp entrance', 'Meet Jordan'] },
  },
]

export const recommendedEvents = [events[0], events[1], events[2]]
