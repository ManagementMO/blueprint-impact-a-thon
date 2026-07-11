import { useEffect, useMemo, useState } from 'react'
import {
  Accessibility, ArrowLeft, Bell, Bus, CalendarDays, Camera, Check, ChevronRight,
  CircleHelp, Clock3, Ear, Heart, Home, Image, MapPin, MessageCircle, Mic,
  Paintbrush, Phone, Printer, Settings2, ShieldCheck,
  Sparkles, Star, Users, Volume2, X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Event, events, recommendedEvents } from './lib/events'
import { AccessibilityBar, ColorModePicker, ColorMode, ReadingMode } from './components/accessibility/AccessibilityBar'
import { Language, ListenButton } from './components/accessibility/ListenButton'
import { Onboarding } from './components/features/Onboarding'
import { HostProfile } from './components/host/HostProfile'
import { EventCommunity } from './components/community/EventCommunity'
import { ReminderModal } from './components/features/ReminderModal'
import { RecommendedBrowser } from './components/events/RecommendedBrowser'
import { AboutKWHab } from './components/features/AboutKWHab'
import { StaffOperations } from './components/host/StaffOperations'

type Tab = 'home' | 'recommended' | 'week' | 'circle' | 'support' | 'staff'

const categories = [
  ['🎨', 'Art'], ['🌳', 'Outdoors'], ['🎵', 'Music'], ['🍳', 'Cooking'],
  ['🏀', 'Sports'], ['🎉', 'Social'], ['🧘', 'Quiet'], ['🚌', 'Trips'],
]

const navItems: [LucideIcon, Exclude<Tab, 'recommended' | 'staff'>, string][] = [
  [Home, 'home', 'Home'],
  [CalendarDays, 'week', 'My Week'],
  [MessageCircle, 'circle', 'Community'],
  [Heart, 'support', 'Support'],
]

const supportCards: [LucideIcon, string, string, string, string][] = [
  [Accessibility, 'Mobility support', 'Entrances, paths, and getting around', 'Jordan · trained staff', 'Available to request'],
  [MessageCircle, 'Communication support', 'Pictures, plain words, and time to talk', 'Mina · communication helper', 'Available to request'],
  [Ear, 'Hearing support', 'Find a quieter seat or use a hearing loop', 'Staff can check first', 'Ask the host'],
  [Accessibility, 'Visual support', 'A sighted guide and clear route details', 'Jordan · trained staff', 'Book ahead'],
  [Heart, 'Calm support', 'Quiet space, headphones, or a break plan', 'Priya · event staff', 'Available at events'],
  [Bus, 'Transportation help', 'Bus routes and a ride-planning call', 'Mina · coordinator', 'Call to plan'],
]

function StatusBadge({ state }: { state: Event['registration'] }) {
  return <span className={'registration ' + (state === 'Yes, just come' ? 'drop-in' : 'signup')}>
    {state === 'Yes, just come' ? <Check size={18} /> : <CalendarDays size={18} />}{state}
  </span>
}

function SymbolStrip({ event }: { event: Event }) {
  const items = [
    ['🎨', event.category], ['🕐', event.day + ' · ' + event.time], ['📍', event.place], ['🆓', event.cost],
    ['🚌', event.bus], ['👥', event.group], ['🔊', event.noise], ['♿', event.access], ['🧑‍🤝‍🧑', event.support],
  ]
  return <div className="symbol-strip" aria-label="Event details">{items.map(([icon, value]) => <span key={value}><b aria-hidden="true">{icon}</b>{value}</span>)}</div>
}

function EventCard({ event, onOpen, compact = false, slow }: { event: Event; onOpen: (event: Event) => void; compact?: boolean; slow: boolean }) {
  return <article className={'event-card' + (compact ? ' compact' : '')}>
    <button className="event-image-button" onClick={() => onOpen(event)} aria-label={event.title}>
      <img src={event.image} alt={event.title + ' event'} /><span className="event-photo-tag">{event.category}</span>
    </button>
    <div className="event-card-body">
      <div className="event-card-title"><h3>{event.title}</h3><ListenButton text={event.title + '. ' + event.plain} label={event.title} slow={slow} /></div>
      <StatusBadge state={event.registration} />
      {!compact && <p className="recommendation"><Sparkles size={16} />{event.reason}</p>}
      <div className="mini-details"><span><Clock3 size={16} />{event.day}</span><span><MapPin size={16} />{event.place}</span></div>
      <button className="open-event" onClick={() => onOpen(event)}>See event <ChevronRight size={18} /></button>
    </div>
  </article>
}

function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [mode, setMode] = useState<ReadingMode>('easy')
  const [pecs, setPecs] = useState(false)
  const [colorMode, setColorMode] = useState<ColorMode>('normal')
  const [colorPicker, setColorPicker] = useState(false)
  const [language, setLanguage] = useState<Language>('en-CA')
  const [onboarding, setOnboarding] = useState(true)
  const [selected, setSelected] = useState<Event | null>(null)
  const [saved, setSaved] = useState<string[]>([])
  const [circleTab, setCircleTab] = useState<'Updates' | 'Chat' | 'Photos' | 'Going' | 'Help'>('Updates')
  const [requested, setRequested] = useState<string | null>(null)
  const [staffOpen, setStaffOpen] = useState(false)
  const [accessibilityLens, setAccessibilityLens] = useState(false)
  const [reminders, setReminders] = useState(false)
  const [reminderChoice, setReminderChoice] = useState<string | null>(null)
  const [about, setAbout] = useState(false)
  const slow = mode === 'audio'
  const selectedEvent = selected ?? events[0]
  const save = (event: Event) => setSaved((ids) => ids.includes(event.id) ? ids : [...ids, event.id])
  const savedEvents = useMemo(() => events.filter((event) => saved.includes(event.id)), [saved])
  const openEvent = (event: Event) => { setSelected(event); setTab('recommended') }

  useEffect(() => {
    document.documentElement.dataset.colorMode = colorMode
    document.documentElement.dataset.pecs = String(pecs)
    document.documentElement.lang = language
  }, [colorMode, language, pecs])

  const header = <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className={'app-header' + (staffOpen ? ' staff-active' : '')}>
      <button className="brand" onClick={() => { setSelected(null); setTab('home') }} aria-label="Belonging Loop home"><span><Sparkles size={20} /></span>belonging <strong>loop</strong></button>{staffOpen && <span className="staff-mode-badge">● STAFF MODE</span>}
      <AccessibilityBar mode={mode} pecs={pecs} language={language} onMode={setMode} onPecs={() => setPecs(!pecs)} onColor={() => setColorPicker(true)} onLanguage={setLanguage} />
      <button className="notification-button" onClick={() => setReminders(true)} aria-label="Reminder settings"><Bell size={22} /></button>
      <button className="staff-entry" onClick={() => { setStaffOpen(!staffOpen); setTab(staffOpen ? 'home' : 'staff') }} aria-label="Open staff tools"><Settings2 size={20} /><span>Staff</span></button>
    </header>
    {pecs && <div className="pecs-banner" role="status"><Image size={21} /><strong>PECS is ON</strong><span>Tap a picture.</span></div>}
    {mode === 'audio' && <div className="audio-banner"><Volume2 size={19} /><strong>Audio First</strong><span>Tap any speaker. Speech is slower.</span><button onClick={() => window.speechSynthesis?.cancel()} aria-label="Stop listening"><X size={16} /> Stop</button></div>}
  </>

  const renderHome = () => <section className="screen home-screen">
    <div className="welcome-row"><div><p className="eyebrow">YOUR COMMUNITY EVENTS</p><h1>{pecs ? 'Tap a picture' : 'What would you like to do?'}</h1><p>{pecs ? 'Choose one picture.' : 'Pick a picture. We will show a few good events.'}</p></div><ListenButton text="What would you like to do? Pick a picture. We will show good events." label="Home" slow={slow} /></div>
    <button className="say-wish" onClick={() => setTab('recommended')}><span><Mic size={29} /></span><div><strong>{pecs ? '🎤' : 'Tell us with your voice'}</strong><small>{pecs ? 'Tap to talk' : 'Say what you want to do'}</small></div><ChevronRight size={22} /></button>
    <div className="category-grid" aria-label="Event categories">{categories.map(([emoji, title]) => <button key={title} onClick={() => setTab('recommended')} aria-label={title}><span>{emoji}</span><strong>{pecs ? '' : title}</strong></button>)}</div>
    <section className="next-event"><div><p className="eyebrow">COMING UP</p><h2>Saturday morning</h2><p>One calm outdoor event is ready to explore.</p></div><EventCard event={events[0]} onOpen={openEvent} compact slow={slow} /></section>
  </section>

  const renderRecommended = () => selected ? <section className="screen event-detail">
    <button className="back-button" onClick={() => setSelected(null)}><ArrowLeft size={19} />Back to events</button>
    <HostProfile slow={slow} language={language} />
    <div className="detail-hero"><img src={selected.image} alt={selected.title + ' event'} /><div><p className="eyebrow">{selected.category}</p><h1>{selected.title}</h1><p>{mode === 'standard' ? selected.short : selected.plain}</p><ListenButton text={selected.plain} label={selected.title + ' description'} slow={slow} language={language} /></div></div>
    <div className="detail-actions"><StatusBadge state={selected.registration} /><button className="save-button" onClick={() => save(selected)}>{saved.includes(selected.id) ? <Check size={20} /> : <CalendarDays size={20} />}{saved.includes(selected.id) ? 'Saved to My Week' : 'Save to My Week'}</button><a className="event-cta" href="https://kwhab.ca/" target="_blank" rel="noreferrer">Register / Learn more</a><button className="event-cta" onClick={() => setTab('circle')}>Join Community</button></div>
    <p className="recommendation detail-reason"><Sparkles size={18} />{selected.reason}</p>
    <div className="lens-row"><button className={accessibilityLens ? 'lens-button active' : 'lens-button'} onClick={() => setAccessibilityLens(!accessibilityLens)} aria-pressed={accessibilityLens}><Accessibility size={20} />Accessibility Lens</button>{accessibilityLens && <div className="lens-summary"><span>🚪 Step-free: reported</span><span>🔇 Quiet break: yes</span><span>🚌 {selected.bus}</span><span>🚻 Washroom: ask host</span><span>👥 {selected.group}</span></div>}</div>
    {!accessibilityLens && <SymbolStrip event={selected} />}
    {selected.journey && <section className="transit-card" aria-labelledby="transit-title"><div><p className="eyebrow">TRANSIT COMPANION</p><h2 id="transit-title">Can I get there?</h2><strong>🚌 {selected.journey.route}</strong><p>{selected.journey.leave}<br />{selected.journey.duration}</p></div><div className="journey-steps">{selected.journey.steps.map((step, index) => <span key={step}>{index ? '↓ ' : ''}{step}</span>)}</div><div><ListenButton text={selected.journey.route + '. ' + selected.journey.leave + '. ' + selected.journey.duration} label="journey" slow={slow} language={language} /><button className="maps-button" aria-label="Open journey in maps">📍 Open in Maps</button></div></section>}
    <section className="arrival-section"><div className="section-title"><div><p className="eyebrow">WHEN I GET THERE</p><h2>What happens when I arrive?</h2><p>Tap a picture to hear the step.</p></div><ListenButton text={selected.arrival.map((step) => step.title + '. ' + step.detail).join('. ')} label="arrival steps" slow={slow} /></div><div className="arrival-steps">{selected.arrival.map((step, index) => <button key={step.title} onClick={() => { if ('speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(step.title + '. ' + step.detail)) }}><img src={step.image} alt={step.title} /><span className="step-number">{index + 1}</span><span className="step-icon">{step.icon}</span><strong>{step.title}</strong><small>{step.detail}</small><Volume2 size={17} /></button>)}</div><div className="arrival-video"><span>▶</span><div><strong>Walk with me to the event</strong><small>First-person arrival video · 0:32</small></div><button aria-label="Play first person arrival video">Play video</button></div></section>
    <section className="fact-note"><ShieldCheck size={24} /><div><strong>Event facts are checked by the host.</strong><p>Some access details are reported. Ask staff if you need to know more.</p></div><button onClick={() => setTab('support')}>Get support <ChevronRight size={18} /></button></section>
  </section> : <section className="screen recommended-screen"><div className="welcome-row"><div><p className="eyebrow">A FEW GOOD MATCHES</p><h1>{pecs ? 'Good events' : 'Recommended for you'}</h1><p>{pecs ? 'Tap one event.' : 'Only a few events that fit your choices.'}</p></div><ListenButton text="Here are a few events picked for you." label="recommended events" slow={slow} /></div><div className="event-grid">{recommendedEvents.map((event) => <EventCard key={event.id} event={event} onOpen={openEvent} slow={slow} />)}</div></section>

  const renderWeek = () => <section className="screen week-screen"><div className="welcome-row"><div><p className="eyebrow">MY WEEK</p><h1>My plans</h1><p>Events you saved stay here.</p></div><button className="print-button" onClick={() => window.print()}><Printer size={20} />Print My Week</button></div>{savedEvents.length ? <div className="week-list">{savedEvents.map((event) => <article key={event.id} className="week-card"><div className="date-box"><strong>{event.day.slice(0, 3)}</strong><span>{event.time.slice(0, 5)}</span></div><img src={event.image} alt="" /><div><h2>{event.title}</h2><p><Bus size={16} />{event.bus}</p><p><Heart size={16} />{event.support}</p></div><StatusBadge state={event.registration} /><ListenButton text={event.title + '. ' + event.day + '. ' + event.time + '. ' + event.bus} label={event.title} slow={slow} /></article>)}</div> : <div className="empty-week"><CalendarDays size={42} /><h2>No events saved yet</h2><p>Look at recommended events and tap Save to My Week.</p><button onClick={() => setTab('recommended')}>See events <ChevronRight size={19} /></button></div>}<div className="fridge-note"><Printer size={19} /><span><strong>Print My Week</strong> makes a big, simple schedule with pictures and room for notes.</span></div></section>

  const renderCircle = () => <section className="screen circle-screen"><div className="circle-heading"><div><p className="eyebrow">EVENT CIRCLE</p><h1>{selectedEvent.title}</h1><p>A small, moderated space for this one event.</p></div><span className="private-badge"><ShieldCheck size={17} />Names stay private</span></div><div className="circle-tabs">{(['Updates', 'Chat', 'Photos', 'Going', 'Help'] as const).map((item) => <button key={item} className={circleTab === item ? 'active' : ''} onClick={() => setCircleTab(item)}><span>{item === 'Updates' ? '📢' : item === 'Chat' ? '💬' : item === 'Photos' ? '📷' : item === 'Going' ? '🙋' : '🎁'}</span>{item}</button>)}</div>{circleTab === 'Updates' && <div className="circle-panel announcement"><Bell size={27} /><div><p className="eyebrow">FROM THE HOST</p><h2>Today’s event is in Room 2.</h2><p>The quiet room is next door. Support people are welcome.</p></div><ListenButton text="Today’s event is in Room 2. The quiet room is next door. Support people are welcome." label="host update" slow={slow} /></div>}{circleTab === 'Chat' && <div className="circle-panel chat"><p className="moderated"><ShieldCheck size={16} />Host-moderated chat</p><div className="message question"><span>J</span><p>Hi! Is there a quiet room?</p><ListenButton text="Hi. Is there a quiet room?" label="chat question" slow={slow} /></div><div className="message answer"><span>T</span><p>Yes. There is a quiet room beside the main activity room.</p><ListenButton text="Yes. There is a quiet room beside the main activity room." label="chat answer" slow={slow} /></div><div className="message question"><span>M</span><p>Can I bring my support person?</p></div><div className="message answer"><span>T</span><p>Yes. Support people are welcome.</p></div></div>}{circleTab === 'Photos' && <div className="photo-panel"><p><Camera size={17} />Photos only show people who said yes.</p><div>{[events[1], events[0], events[2]].map((event) => <figure key={event.id}><img src={event.image} alt={'Consent-approved photo from ' + event.title} /><figcaption><span>Consent approved</span>{event.title}<ListenButton text={'A photo from ' + event.title} label={event.title + ' photo'} slow={slow} /></figcaption></figure>)}</div></div>}{circleTab === 'Going' && <div className="circle-panel going"><Users size={33} /><h2>8 people are going</h2><p>You can join without showing your name.</p><div className="avatars"><span>J</span><span>S</span><span>A</span><span>R</span><span>+4</span></div><button>Join privately <Check size={18} /></button></div>}{circleTab === 'Help' && <div className="contribution-grid">{[['🎂', 'Bring cake'], ['🎲', 'Bring a game'], ['🎵', 'Choose a song'], ['📷', 'Choose a photo'], ['👋', 'Welcome someone'], ['✅', 'Just attend']].map(([icon, label]) => <button key={label} onClick={() => setRequested(label)} className={requested === label ? 'chosen' : ''}><span>{icon}</span><strong>{label}</strong><small>{label === 'Just attend' ? 'Always enough' : 'Optional'}</small></button>)}</div>}</section>

  const renderSupport = () => about ? <AboutKWHab onBack={() => setAbout(false)} slow={slow} language={language} /> : <section className="screen support-screen"><div className="welcome-row"><div><p className="eyebrow">SUPPORT</p><h1>What help would be useful?</h1><p>Pick one kind of help. A staff person will talk with you.</p></div><ListenButton text="What help would be useful? Pick one kind of help. A staff person will talk with you." label="support options" slow={slow} /></div><div className="support-grid">{supportCards.map(([Icon, title, detail, staff, status]) => <article key={title}><div className="support-icon"><Icon size={30} /></div><h2>{title}</h2><p>{detail}</p><span>{staff}</span><small>{status}</small><button onClick={() => setRequested(title)}>{requested === title ? <Check size={18} /> : <Phone size={18} />}{requested === title ? 'Help request sent' : 'Ask for help'}</button></article>)}</div><section className="belonging-tap"><strong>🟡 BELONGING TAP</strong><h2>Tap a poster to find events.</h2><p>No app. No account. Just tap.</p><p>📚 Libraries · 🏥 Hospitals · 🚌 Bus stations · 🏠 Group homes</p><button>See where posters are →</button></section><section className="about-preview"><h2>About KW Habilitation</h2><p>We help people of all abilities live, work, and belong.</p><button onClick={() => setAbout(true)}>Learn more →</button></section><p className="support-footer"><CircleHelp size={18} />This is a request, not a booking. Staff will confirm what is possible.</p></section>

  const renderStaff = () => <section className="staff-screen"><header><div><p className="eyebrow">STAFF TOOLS · PROTOTYPE ONLY</p><h1>Event workspace</h1><p>Detailed tools stay separate from the participant calendar.</p></div><button onClick={() => { setStaffOpen(false); setTab('home') }}><ArrowLeft size={19} />Participant view</button></header><div className="staff-grid"><article><h2>1. Event details</h2><label>Event name<input defaultValue="Accessible Nature Walk" /></label><label>Plain-language description<textarea defaultValue={events[0].plain} /></label><button>Save event details</button></article><article><h2>2. Arrival and access</h2><p><Image size={18} />4 arrival photos ready</p><p><Check size={18} />Step-free path: reported Jul 10</p><p><CircleHelp size={18} />Quiet bench: confirmed by host</p><button>Update access facts</button></article><article><h2>3. Moderation queue</h2><p><MessageCircle size={18} />2 chat messages pending</p><p>“Is there a quiet room?” — J</p><p>“Can I bring my mom?” — A</p><button>Open moderation</button></article><article><h2>4. Support coordination</h2><p><Accessibility size={18} />Jordan: mobility support</p><p><Bus size={18} />Route 7 transport information</p><p><ShieldCheck size={18} />No support is assigned automatically</p><button>Review support requests</button></article></div><StaffOperations /></section>

  if (onboarding) return <div className="app-shell">{header}<Onboarding onFinish={() => setOnboarding(false)} onMode={(nextMode, nextPecs) => { setMode(nextMode); if (nextPecs) setPecs(true) }} />{colorPicker && <ColorModePicker onChoose={setColorMode} onClose={() => setColorPicker(false)} />}</div>

  return <div className="app-shell">{header}<main id="main-content">{tab === 'home' ? renderHome() : tab === 'recommended' ? (selected ? renderRecommended() : <RecommendedBrowser onOpen={openEvent} />) : tab === 'week' ? renderWeek() : tab === 'circle' ? <EventCommunity event={selectedEvent} slow={slow} language={language} /> : tab === 'support' ? renderSupport() : renderStaff()}</main>{tab !== 'staff' && <nav className="bottom-nav" aria-label="Main navigation">{navItems.map(([Icon, value, label]) => <button key={value} className={tab === value ? 'active' : ''} onClick={() => { setSelected(null); setTab(value) }} aria-label={label}><Icon size={30} /><span>{label}</span></button>)}</nav>}{colorPicker && <ColorModePicker onChoose={setColorMode} onClose={() => setColorPicker(false)} />}{reminders && <ReminderModal choice={reminderChoice} onChoose={setReminderChoice} onClose={() => setReminders(false)} />}</div>
}

export default App
