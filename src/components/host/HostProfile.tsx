import { Play, Volume2 } from 'lucide-react'
import { ListenButton } from '../accessibility/ListenButton'
import { Language } from '../accessibility/ListenButton'

export function HostProfile({ slow, language }: { slow: boolean; language: Language }) {
  const bio = "Hi, I am Jordan. I run LEG Up! programs at KW Habilitation. I have worked here for three years. I love painting and helping people try new things. I will meet you at the door."
  return <section className="host-profile" aria-labelledby="host-title"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=360&q=85" alt="Jordan, the event host" /><div><p className="eyebrow">YOUR HOST</p><h2 id="host-title">Hi, I am Jordan <span aria-hidden="true">👋</span></h2><strong>LEG Up! Program Coordinator</strong><p>I have worked at KW Hab for 3 years.<br />I love painting and trying new things.<br />I will meet you at the door.</p><p className="fun-fact">Fun fact: I grow tomatoes.</p></div><div className="host-actions"><ListenButton text={bio} label="Jordan introduction" slow={slow} language={language} /><button onClick={() => { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(bio); utterance.lang = language; utterance.rate = slow ? .75 : 1; window.speechSynthesis.speak(utterance) }} aria-label="Hear Jordan introduce himself"><Play size={18} />Hear Jordan say hi</button></div></section>
}
