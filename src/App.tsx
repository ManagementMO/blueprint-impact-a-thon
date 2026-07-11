import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  Bot,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Compass,
  Ear,
  Flower2,
  Footprints,
  HandHeart,
  Leaf,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  MoveRight,
  Music2,
  PencilLine,
  Plus,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Volume2,
  Wheat,
  X,
} from 'lucide-react'
import { describeEventFit } from './lib/belonging'

type View = 'discover' | 'plan' | 'circle' | 'host'
type SupportMode = 'paid' | 'helper'

const eventCandidate = {
  interests: ['nature', 'wellness'],
  day: 'Saturday',
  groupSize: 'small' as const,
  accessFacts: {
    'quiet-break': 'confirmed' as const,
    'mobility-support': 'not-arranged' as const,
  },
}

const wish = {
  interests: ['nature'],
  preferredDay: 'Saturday',
  groupPreference: 'small' as const,
  needs: ['quiet-break', 'mobility-support'],
}

const accessFacts = [
  {
    label: 'Trail entrance',
    value: 'Meet beside the west pavilion gate',
    state: 'Confirmed',
    detail: 'KW Hab host checked Jul 10',
    icon: MapPin,
  },
  {
    label: 'First five minutes',
    value: 'Say hello, choose a name tag, meet the group',
    state: 'Confirmed',
    detail: 'Host guide for this event',
    icon: HandHeart,
  },
  {
    label: 'Quiet break spot',
    value: 'Benches near the native garden',
    state: 'Confirmed',
    detail: 'Our Farm team checked Jul 9',
    icon: Leaf,
  },
  {
    label: 'Accessible washroom',
    value: 'Inside the pavilion, 45 m from the trailhead',
    state: 'Reported',
    detail: 'Reported by a partner',
    icon: CircleHelp,
  },
  {
    label: 'Mobility support',
    value: 'Not arranged yet',
    state: 'Not known',
    detail: 'Coordinator review needed',
    icon: Route,
  },
]

const steps = [
  {
    title: 'Arrive at the west pavilion',
    detail: 'Look for the yellow welcome flag beside the garden gate.',
    icon: MapPin,
  },
  {
    title: 'Meet Tasha at the check-in table',
    detail: 'She will have name tags and the day’s easy-read trail map.',
    icon: HandHeart,
  },
  {
    title: 'Choose your pace before the walk',
    detail: 'The group starts after a short hello and a quiet moment to settle in.',
    icon: Footprints,
  },
]

function StatusPill({ state }: { state: string }) {
  const normalized = state.toLowerCase().replace(' ', '-')
  return <span className={'status-pill ' + normalized}>{state}</span>
}

function App() {
  const [view, setView] = useState<View>('discover')
  const [showMatch, setShowMatch] = useState(false)
  const [selectedInterest, setSelectedInterest] = useState<'nature' | 'music' | 'art'>('nature')
  const [wishShared, setWishShared] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [joined, setJoined] = useState(false)
  const [cakeClaimed, setCakeClaimed] = useState(false)
  const [supportMode, setSupportMode] = useState<SupportMode>('paid')
  const [reviewed, setReviewed] = useState(false)
  const [published, setPublished] = useState(false)
  const [hostTitle, setHostTitle] = useState('Saturday Trail Circle')
  const [entrance, setEntrance] = useState('West pavilion gate beside the native garden')
  const [quietState, setQuietState] = useState('Confirmed')
  const [supportState, setSupportState] = useState('Not arranged')

  const fit = useMemo(() => describeEventFit(wish, eventCandidate), [])

  const speak = () => {
    setAudioReady(true)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          'Saturday Trail Circle. Small group nature walk. Meet at the west pavilion at ten thirty.',
        ),
      )
    }
  }

  const goTo = (nextView: View) => {
    if (nextView !== 'discover') {
      setShowMatch(true)
    }
    setView(nextView)
  }

  const renderDiscover = () => {
    if (showMatch) {
      if (selectedInterest !== 'nature') {
        const interestLabel = selectedInterest === 'music' ? 'music' : 'making something'
        const InterestIcon = selectedInterest === 'music' ? Music2 : Flower2

        return (
          <section className="screen empty-match" aria-labelledby="wish-shared-title">
            <div className="empty-match-mark"><InterestIcon size={28} aria-hidden="true" /></div>
            <span className="section-eyebrow">A useful no-match</span>
            <h1 id="wish-shared-title">We do not see a close {interestLabel} match for Saturday yet.</h1>
            <p>That is useful information. You can add this wish anonymously so the Collective sees the pattern without seeing your name.</p>
            <div className="anonymous-wish-card">
              <div>
                <span>Shared only as a group pattern</span>
                <strong>Small, calm {interestLabel} on a Saturday morning</strong>
              </div>
              <LockKeyhole size={22} aria-hidden="true" />
            </div>
            <div className="action-row">
              <button className={wishShared ? 'published-button' : 'primary-button'} onClick={() => setWishShared(true)}>
                {wishShared ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                {wishShared ? 'Wish shared anonymously' : 'Share this wish'}
              </button>
              <button className="secondary-button" onClick={() => { setSelectedInterest('nature'); setShowMatch(false) }}>
                Choose a different day
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            {wishShared && <p className="share-confirmation"><ShieldCheck size={16} aria-hidden="true" /> Partners only see this after enough similar wishes are grouped together.</p>}
          </section>
        )
      }

      return (
        <section className="screen match-screen" aria-labelledby="match-title">
          <div className="screen-topline">
            <button className="back-link" onClick={() => setShowMatch(false)}>
              <ArrowRight size={16} aria-hidden="true" />
              Edit my wish
            </button>
            <span className="match-score">{fit.score}% match from your choices</span>
          </div>

          <div className="event-hero">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=85"
              alt="Sunlight filtering through a green forest trail"
            />
            <div className="hero-scrim" />
            <div className="event-hero-content">
              <div className="event-kicker">
                <span>Saturday</span>
                <span>10:30 AM - 12:15 PM</span>
              </div>
              <h1 id="match-title">{hostTitle}</h1>
              <p>Small group trail walk with space to set your own pace.</p>
              <div className="event-meta">
                <span><MapPin size={16} aria-hidden="true" /> Our Farm, Waterloo</span>
                <span><UsersRound size={16} aria-hidden="true" /> 8 people going</span>
              </div>
            </div>
            <button className="listen-button" onClick={speak} aria-pressed={audioReady}>
              <Volume2 size={18} aria-hidden="true" />
              {audioReady ? 'Listening guide ready' : 'Listen to this event'}
            </button>
          </div>

          <div className="match-grid">
            <section className="match-panel panel-soft">
              <span className="section-eyebrow">Why it came up</span>
              <h2>Built around your choices, not a category.</h2>
              <ul className="reason-list">
                {fit.reasons.map((reason) => (
                  <li key={reason}>
                    <Check size={16} aria-hidden="true" />
                    {reason}
                  </li>
                ))}
              </ul>
            </section>
            <section className="match-panel panel-alert">
              <div className="alert-icon"><ShieldCheck size={20} aria-hidden="true" /></div>
              <span className="section-eyebrow">Important before you decide</span>
              <h2>{fit.blockers[0]}</h2>
              <p>A coordinator can review an approved support option. You choose whether it works for you.</p>
              <button className="text-button" onClick={() => goTo('host')}>
                See the support plan
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </section>
          </div>

          <div className="action-row">
            <button className="primary-button" onClick={() => goTo('plan')}>
              See what to expect
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button className="secondary-button" onClick={() => goTo('circle')}>
              Visit the event circle
              <MessageCircle size={18} aria-hidden="true" />
            </button>
          </div>
        </section>
      )
    }

    return (
      <section className="screen wish-screen" aria-labelledby="wish-title">
        <div className="wish-header">
          <div>
            <span className="section-eyebrow">Maya's private plan</span>
            <h1 id="wish-title">A day that feels like yours.</h1>
            <p>Choose what matters today. No diagnosis, account, or public RSVP needed.</p>
          </div>
          <button className="audio-guide" onClick={speak} aria-pressed={audioReady}>
            <Volume2 size={18} aria-hidden="true" />
            {audioReady ? 'Audio guide ready' : 'Read this aloud'}
          </button>
        </div>

        <div className="journey-card">
          <div className="journey-rail" aria-label="Wish flow progress">
            <span className="rail-label active">1. What sounds good</span>
            <span className="rail-line" />
            <span className="rail-label">2. When it works</span>
            <span className="rail-line" />
            <span className="rail-label">3. What would help</span>
          </div>
          <div className="wish-content">
            <div className="question-marker">01</div>
            <span className="section-eyebrow">Start with the feeling</span>
            <h2>What would make Saturday feel good?</h2>
            <div className="choice-grid" role="group" aria-label="Interest choices">
              <button className={selectedInterest === 'nature' ? 'choice-card selected' : 'choice-card'} onClick={() => setSelectedInterest('nature')}>
                <span className="choice-icon nature"><Leaf size={25} aria-hidden="true" /></span>
                <span>Fresh air</span>
                <small>Nature and movement</small>
              </button>
              <button className={selectedInterest === 'music' ? 'choice-card selected' : 'choice-card'} onClick={() => setSelectedInterest('music')}>
                <span className="choice-icon sound"><Music2 size={25} aria-hidden="true" /></span>
                <span>Music</span>
                <small>Listen, sing, or play</small>
              </button>
              <button className={selectedInterest === 'art' ? 'choice-card selected' : 'choice-card'} onClick={() => setSelectedInterest('art')}>
                <span className="choice-icon make"><Flower2 size={25} aria-hidden="true" /></span>
                <span>Make something</span>
                <small>Hands-on and social</small>
              </button>
            </div>
            <div className="wish-summary">
              <div><span>When</span><strong>Saturday morning</strong></div>
              <div><span>Group</span><strong>Small and calm</strong></div>
              <div><span>Helpful to have</span><strong>Quiet break + mobility support</strong></div>
            </div>
            <button className="primary-button" onClick={() => setShowMatch(true)}>
              Show my match
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className="privacy-note"><LockKeyhole size={14} aria-hidden="true" /> Your choices stay private. Shared wishes are only shown in anonymous groups.</p>
          </div>
        </div>

        <div className="soft-insight">
          <Compass size={19} aria-hidden="true" />
          <p><strong>Nothing feels right?</strong> You can share a wish anonymously. Partners see patterns, not people.</p>
          <button className="text-button" onClick={() => { setSelectedInterest('music'); setShowMatch(true) }}>Share a different wish <MoveRight size={16} aria-hidden="true" /></button>
        </div>
      </section>
    )
  }

  const renderPlan = () => (
    <section className="screen plan-screen" aria-labelledby="plan-title">
      <div className="plan-heading">
        <div>
          <span className="section-eyebrow">Before I go</span>
          <h1 id="plan-title">A calm start, step by step.</h1>
          <p>These are facts about this event, not a promise that one setting works for everyone.</p>
        </div>
        <button className="outline-button" onClick={speak}>
          <Volume2 size={17} aria-hidden="true" /> Read arrival guide
        </button>
      </div>

      <div className="arrival-layout">
        <div className="arrival-image">
          <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85"
            alt="A quiet forest path with sunlight between tall trees"
          />
          <div className="arrival-image-caption">
            <MapPin size={16} aria-hidden="true" />
            West pavilion gate, beside the native garden
          </div>
        </div>
        <div className="step-list">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article className="arrival-step" key={step.title}>
                <span className="step-number">0{index + 1}</span>
                <span className="step-icon"><Icon size={18} aria-hidden="true" /></span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.detail}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <section className="facts-section" aria-labelledby="facts-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">Event facts</span>
            <h2 id="facts-title">What we know right now</h2>
          </div>
          <span className="fact-legend"><span className="legend-dot confirmed-dot" /> Confirmed <span className="legend-dot reported-dot" /> Reported <span className="legend-dot unknown-dot" /> Not known</span>
        </div>
        <div className="facts-grid">
          {accessFacts.map((fact) => {
            const Icon = fact.icon
            return (
              <article className="fact-card" key={fact.label}>
                <div className="fact-card-top">
                  <span className="fact-icon"><Icon size={18} aria-hidden="true" /></span>
                  <StatusPill state={fact.state} />
                </div>
                <h3>{fact.label}</h3>
                <p>{fact.value}</p>
                <small>{fact.detail}</small>
              </article>
            )
          })}
        </div>
      </section>

      <div className="plan-actions">
        <div className="support-message">
          <ShieldCheck size={20} aria-hidden="true" />
          <p><strong>Mobility support is not arranged.</strong> A coordinator can review an approved option. You can still decide not to attend.</p>
        </div>
        <div className="button-cluster">
          <button className="secondary-button" onClick={() => goTo('host')}>View coordinator review <ChevronRight size={17} aria-hidden="true" /></button>
          <button className="primary-button" onClick={() => goTo('circle')}>Go to my event circle <ArrowRight size={17} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  )

  const renderCircle = () => (
    <section className="screen circle-screen" aria-labelledby="circle-title">
      <div className="circle-hero">
        <div>
          <div className="circle-topline">
            <span className="section-eyebrow">Saturday Trail Circle</span>
            <span className="private-chip"><LockKeyhole size={13} aria-hidden="true" /> Attendance stays private</span>
          </div>
          <h1 id="circle-title">Join the moment before you arrive.</h1>
          <p>A small, host-moderated space for questions, preparation, and optional ways to take part.</p>
        </div>
        <button className={joined ? 'joined-button' : 'primary-button'} onClick={() => setJoined(!joined)}>
          {joined ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
          {joined ? 'Joining privately' : 'Join privately'}
        </button>
      </div>

      <div className="circle-layout">
        <div className="circle-main">
          <section className="announcement-card">
            <div className="announcement-mark"><Bell size={20} aria-hidden="true" /></div>
            <div>
              <span className="section-eyebrow">From Tasha, event host</span>
              <h2>“We will pause at the garden benches before we begin walking.”</h2>
              <p>Posted today at 9:10 AM. This answer is also added to the event facts.</p>
            </div>
          </section>

          <section className="conversation-card">
            <div className="card-heading">
              <div>
                <span className="section-eyebrow">One moderated question</span>
                <h2>What happens if I need a break early?</h2>
              </div>
              <button className="icon-button" aria-label="More question actions"><MoreHorizontal size={18} aria-hidden="true" /></button>
            </div>
            <div className="reply">
              <span className="reply-avatar">T</span>
              <div>
                <strong>Tasha · host</strong>
                <p>You can let me know at the benches, or leave with your support person. There is no pressure to finish the route.</p>
              </div>
            </div>
            <button className="text-button">Ask a private question <ChevronRight size={16} aria-hidden="true" /></button>
          </section>
        </div>

        <aside className="circle-side">
          <section className="people-card">
            <div className="card-heading">
              <div>
                <span className="section-eyebrow">Who is coming</span>
                <h2>8 people are planning to join</h2>
              </div>
              <UsersRound size={20} aria-hidden="true" />
            </div>
            <div className="avatar-row" aria-label="Eight event participants, names hidden">
              {['M', 'J', 'S', 'A', 'R', 'D', 'K', 'L'].map((initial, index) => (
                <span className={'avatar avatar-' + index} key={initial + index}>{initial}</span>
              ))}
            </div>
            <p>Names only appear when each person chooses to share them.</p>
          </section>

          <section className="bring-card">
            <div className="card-heading">
              <div>
                <span className="section-eyebrow">Bring together</span>
                <h2>Small things, optional.</h2>
              </div>
              <Wheat size={20} aria-hidden="true" />
            </div>
            <div className="bring-item">
              <span><span className="bring-dot cake" /> Cake</span>
              <strong>Sam is bringing it</strong>
            </div>
            <div className="bring-item">
              <span><span className="bring-dot icing" /> Icing</span>
              <button className={cakeClaimed ? 'claimed-item' : 'claim-item'} onClick={() => setCakeClaimed(!cakeClaimed)}>
                {cakeClaimed ? 'You are bringing it' : 'I can bring this'}
              </button>
            </div>
            <p className="muted-note">Just attending is always enough.</p>
          </section>

          <section className="readiness-card">
            <div className="readiness-copy">
              <Sparkles size={19} aria-hidden="true" />
              <span>Event readiness</span>
              <strong>{cakeClaimed ? '76%' : '68%'}</strong>
            </div>
            <div className="readiness-track"><span style={{ width: cakeClaimed ? '76%' : '68%' }} /></div>
            <p>Access facts, questions, and optional contributions help the group prepare together.</p>
          </section>
        </aside>
      </div>
    </section>
  )

  const renderHost = () => (
    <section className="screen host-screen" aria-labelledby="host-title">
      <div className="host-heading">
        <div>
          <span className="section-eyebrow">Host workspace</span>
          <h1 id="host-title">Make the invitation clear.</h1>
          <p>Publish facts people can use. Mark unknowns instead of guessing.</p>
        </div>
        <div className="host-status">
          <span className="mock-chip"><Bot size={14} aria-hidden="true" /> Prototype data only</span>
          <button className="outline-button" onClick={() => goTo('plan')}>
            Preview public event <MoveRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="host-layout">
        <section className="host-form-card">
          <div className="card-heading">
            <div>
              <span className="section-eyebrow">Step 1 of 2</span>
              <h2>Event and arrival facts</h2>
            </div>
            <PencilLine size={20} aria-hidden="true" />
          </div>
          <label>
            Event name
            <input value={hostTitle} onChange={(event) => setHostTitle(event.target.value)} />
          </label>
          <label>
            Arrival point
            <input value={entrance} onChange={(event) => setEntrance(event.target.value)} />
          </label>
          <div className="two-column-fields">
            <label>
              Quiet break space
              <select value={quietState} onChange={(event) => setQuietState(event.target.value)}>
                <option>Confirmed</option>
                <option>Reported</option>
                <option>Not known</option>
              </select>
            </label>
            <label>
              Support status
              <select value={supportState} onChange={(event) => setSupportState(event.target.value)}>
                <option>Not arranged</option>
                <option>Coordinator reviewing</option>
                <option>Arranged</option>
              </select>
            </label>
          </div>
          <div className="provenance-note">
            <ClipboardCheck size={18} aria-hidden="true" />
            <p><strong>Source owner:</strong> Our Farm team · <strong>Last checked:</strong> Jul 10, 2026</p>
          </div>
          <button className={published ? 'published-button' : 'primary-button'} onClick={() => setPublished(!published)}>
            {published ? <Check size={18} aria-hidden="true" /> : <CalendarDays size={18} aria-hidden="true" />}
            {published ? 'Saved to event preview' : 'Save event facts'}
          </button>
        </section>

        <section className="coordinator-card">
          <div className="card-heading">
            <div>
              <span className="section-eyebrow">Step 2 of 2</span>
              <h2>Coordinator review</h2>
            </div>
            <ShieldCheck size={20} aria-hidden="true" />
          </div>
          <p className="coordinator-intro">AI can surface an option. A coordinator reviews it, and Maya chooses whether it works.</p>

          <div className="support-tabs" role="tablist" aria-label="Support recommendation type">
            <button
              className={supportMode === 'paid' ? 'active' : ''}
              onClick={() => setSupportMode('paid')}
              role="tab"
              aria-selected={supportMode === 'paid'}
            >
              Paid support
            </button>
            <button
              className={supportMode === 'helper' ? 'active' : ''}
              onClick={() => setSupportMode('helper')}
              role="tab"
              aria-selected={supportMode === 'helper'}
            >
              Verified helper
            </button>
          </div>

          {supportMode === 'paid' ? (
            <div className="suggestion-card">
              <div className="suggestion-person">
                <span className="person-badge teal">AK</span>
                <div>
                  <span className="mock-chip">Mock suggestion</span>
                  <h3>Alex Kim · Community Support Worker</h3>
                  <p>Available Saturday 9:45 AM - 12:45 PM</p>
                </div>
              </div>
              <div className="fit-lines">
                <span><Check size={15} aria-hidden="true" /> Outdoor mobility support training</span>
                <span><Check size={15} aria-hidden="true" /> Same neighbourhood and travel window</span>
                <span><X size={15} aria-hidden="true" /> Participant acceptance still needed</span>
              </div>
            </div>
          ) : (
            <div className="suggestion-card">
              <div className="suggestion-person">
                <span className="person-badge amber">ML</span>
                <div>
                  <span className="mock-chip">Mock suggestion</span>
                  <h3>Mei Liu · Approved event helper</h3>
                  <p>Trail orientation verified · 10:00 AM - 12:30 PM</p>
                </div>
              </div>
              <div className="fit-lines">
                <span><Check size={15} aria-hidden="true" /> Role boundaries approved for this event</span>
                <span><Check size={15} aria-hidden="true" /> Host supervision in place</span>
                <span><X size={15} aria-hidden="true" /> Not a replacement for required paid care</span>
              </div>
            </div>
          )}

          <div className="review-footer">
            <p><LockKeyhole size={15} aria-hidden="true" /> No care is assigned here. This is a local prototype of a coordinator review.</p>
            <button className={reviewed ? 'reviewed-button' : 'secondary-button'} onClick={() => setReviewed(!reviewed)}>
              {reviewed ? <Check size={17} aria-hidden="true" /> : <ShieldCheck size={17} aria-hidden="true" />}
              {reviewed ? 'Coordinator review recorded' : 'Review suggestion'}
            </button>
          </div>
        </section>
      </div>

      <div className="host-preview-strip">
        <div>
          <span className="section-eyebrow">Live preview</span>
          <strong>{hostTitle}</strong>
          <span>{entrance}</span>
          <StatusPill state={quietState} />
          <span className="preview-support">Support: {supportState}</span>
        </div>
        <button className="text-button" onClick={() => goTo('plan')}>Open public preview <ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    </section>
  )

  const renderView = () => {
    if (view === 'plan') return renderPlan()
    if (view === 'circle') return renderCircle()
    if (view === 'host') return renderHost()
    return renderDiscover()
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Sparkles size={19} aria-hidden="true" /></span>
          <span>belonging<br /><strong>loop</strong></span>
        </div>
        <nav className="main-nav" aria-label="Prototype views">
          <button className={view === 'discover' ? 'nav-item active' : 'nav-item'} onClick={() => goTo('discover')}>
            <Compass size={18} aria-hidden="true" /><span>My wish</span>
          </button>
          <button className={view === 'plan' ? 'nav-item active' : 'nav-item'} onClick={() => goTo('plan')}>
            <Route size={18} aria-hidden="true" /><span>Before I go</span>
          </button>
          <button className={view === 'circle' ? 'nav-item active' : 'nav-item'} onClick={() => goTo('circle')}>
            <MessageCircle size={18} aria-hidden="true" /><span>Event circle</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <button className={view === 'host' ? 'host-switch active' : 'host-switch'} onClick={() => goTo('host')} aria-label="Open host workspace">
            <span className="switch-icon"><Menu size={17} aria-hidden="true" /></span>
            <span><small>For hosts</small>Workspace</span>
          </button>
          <div className="sidebar-note">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Needs stay private.<br />Facts stay honest.</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs"><span>Waterloo Region</span><ChevronRight size={14} aria-hidden="true" /><strong>Saturday, July 18</strong></div>
          <div className="topbar-actions">
            <span className="demo-chip">Interactive prototype</span>
            <button className="icon-button" aria-label="Notifications"><Bell size={18} aria-hidden="true" /></button>
            <button className="avatar avatar-main" aria-label="Maya's private profile">M</button>
          </div>
        </header>
        {renderView()}
      </main>
    </div>
  )
}

export default App
