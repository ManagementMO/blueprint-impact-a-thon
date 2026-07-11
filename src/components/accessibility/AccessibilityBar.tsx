import { Eye, Image, Star, Volume2 } from 'lucide-react'
import { Language } from './ListenButton'

export type ReadingMode = 'easy' | 'audio' | 'standard'
export type ColorMode = 'normal' | 'red-green' | 'blue-yellow' | 'grayscale'

export function AccessibilityBar({ mode, pecs, language, onMode, onPecs, onColor, onLanguage }: {
  mode: ReadingMode; pecs: boolean; language: Language; onMode: (mode: ReadingMode) => void; onPecs: () => void; onColor: () => void; onLanguage: (language: Language) => void
}) {
  return <div className="accessibility-bar" aria-label="Accessibility controls">
    <button className={mode === 'audio' ? 'active' : ''} onClick={() => onMode('audio')} aria-label="Listen"><Volume2 size={22} /><span>Listen</span></button>
    <button className={pecs ? 'active' : ''} onClick={onPecs} aria-pressed={pecs} aria-label="PECS mode"><Image size={22} /><span>PECS</span></button>
    <button className={mode === 'easy' ? 'active' : ''} onClick={() => onMode('easy')} aria-label="Easy Read"><Star size={22} /><span>Easy Read</span></button>
    <button onClick={onColor} aria-label="Color"><Eye size={22} /><span>Color</span></button>
    <select aria-label="Language for listening" value={language} onChange={(event) => onLanguage(event.target.value as Language)}>
      <option value="en-CA">English</option><option value="fr-CA">Francais</option><option value="es-ES">Espanol</option><option value="pa-IN">Punjabi</option><option value="ar-CA">Arabic</option>
    </select>
  </div>
}

export function ColorModePicker({ onChoose, onClose }: { onChoose: (mode: ColorMode) => void; onClose: () => void }) {
  const choices: [ColorMode, string, string][] = [['normal', '🟢', 'Normal'], ['red-green', '🟠', 'Red-Green'], ['blue-yellow', '🔵', 'Blue-Yellow'], ['grayscale', '⬜', 'Grayscale']]
  return <section className="decision-screen color-picker" role="dialog" aria-modal="true" aria-labelledby="color-title">
    <p className="eyebrow">COLOR ACCESSIBILITY</p><h1 id="color-title">Choose your vision type</h1><p>Pick one. You can change it later.</p>
    <div className="decision-choices">{choices.map(([value, icon, label]) => <button key={value} onClick={() => { onChoose(value); onClose() }} aria-label={label}><span>{icon}</span><strong>{label}</strong></button>)}</div>
    <button className="text-action" onClick={onClose}>Back</button>
  </section>
}
