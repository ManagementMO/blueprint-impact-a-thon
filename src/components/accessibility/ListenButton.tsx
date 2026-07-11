import { Pause, Repeat2, Volume2 } from 'lucide-react'
import { useState } from 'react'

export type Language = 'en-CA' | 'fr-CA' | 'es-ES' | 'pa-IN' | 'ar-CA'

export function ListenButton({ text, label, slow, language = 'en-CA' }: { text: string; label: string; slow: boolean; language?: Language }) {
  const [playing, setPlaying] = useState(false)
  const speak = () => {
    setPlaying(true)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      utterance.rate = slow ? 0.72 : 1
      utterance.onend = () => setPlaying(false)
      window.speechSynthesis.speak(utterance)
    }
  }
  const pause = () => {
    window.speechSynthesis?.pause()
    setPlaying(false)
  }
  return <span className="audio-control">
    <button className={'listen-button' + (playing ? ' playing' : '')} onClick={playing ? pause : speak} aria-label={'Listen to ' + label}>
      {playing ? <Pause size={22} /> : <Volume2 size={22} />}<span>{playing ? 'Speaking slowly' : 'Listen'}</span>
    </button>
    <button className="replay-button" onClick={speak} aria-label={'Replay ' + label}><Repeat2 size={18} /></button>
  </span>
}
