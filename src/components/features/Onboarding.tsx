import { Image, MapPin, MessageCircle, Mic, Star } from 'lucide-react'
import { useState } from 'react'

export function Onboarding({ onFinish, onMode }: { onFinish: () => void; onMode: (mode: 'easy' | 'audio' | 'standard', pecs?: boolean) => void }) {
  const [step, setStep] = useState(0)
  const questions = [
    { title: 'How do you like to use this app?', options: [[Mic, 'Read to me', 'audio'], [Image, 'Pictures', 'pecs'], [Star, 'Read myself', 'standard']] },
    { title: 'What do you like to do?', options: [[null, '🏀 Sports', 'interest'], [null, '🎨 Art', 'interest'], [null, '🎵 Music', 'interest'], [null, '🌳 Nature', 'interest'], [null, '🍕 Food', 'interest']] },
    { title: 'Where are you?', options: [[MapPin, 'Use my location', 'location'], [MapPin, 'Kitchener-Waterloo', 'location']] },
    { title: 'How do you want us to reach you?', options: [[MessageCircle, 'WhatsApp', 'contact'], [MessageCircle, 'Email', 'contact'], [MessageCircle, 'App', 'contact']] },
    { title: 'What is your first name?', options: [[null, 'Skip name', 'finish'], [null, 'Use Maya', 'finish']] },
  ] as const
  const question = questions[step]
  const choose = (value: string) => {
    if (step === 0) onMode(value === 'pecs' ? 'easy' : value as 'easy' | 'audio' | 'standard', value === 'pecs')
    if (step === questions.length - 1) onFinish()
    else setStep((current) => current + 1)
  }
  return <main id="main-content" className="onboarding"><section className="decision-screen"><p className="eyebrow">KW HABILITATION · WELCOME</p><div className="progress-dots" aria-label={'Step ' + (step + 1) + ' of 5'}>{questions.map((_, index) => <span key={index} className={index <= step ? 'active' : ''} />)}</div><h1>{question.title}</h1><p>Pick one. You can change it later.</p><div className="decision-choices">{question.options.map(([Icon, label, value]) => <button key={label} onClick={() => choose(value)} aria-label={label}>{Icon ? <Icon size={40} /> : <span className="choice-emoji">{label.split(' ')[0]}</span>}<strong>{Icon ? label : label.replace(/^\S+\s/, '')}</strong></button>)}</div><button className="text-action" onClick={onFinish}>Skip setup</button><p className="mission">Inspiring Abilities. Enriching Lives.</p></section></main>
}
