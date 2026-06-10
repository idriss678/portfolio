// ─────────────────────────────────────────────────────────────
//  pages/MonPro.jsx — Carte pro + compétences + infos
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import PlayerCard from '../components/PlayerCard.jsx'
import { idriss_pro, CV_PDF } from '../data/projectsData.js'

const BIO_ITEMS = [
  { l: 'Nom complet',   v: 'Idriss Abdellaoui' },
  { l: 'Position',      v: 'DEV / DATA' },
  { l: 'Formation',     v: 'Epitech Bachelor' },
  { l: 'Pied fort',     v: 'Python' },
  { l: 'Localisation',  v: 'Marseille' },
  { l: 'Contact',       v: 'idriss.abdellaoui@epitech.eu', small: true },
  { l: 'Disponibilité', v: 'Stage 1–2 mois', green: true },
  { l: 'Note',          v: '83 OVR', gold: true },
]

const SKILLS = [
  { name: 'Python',           value: 88 },
  { name: 'Machine Learning', value: 82 },
  { name: 'Cybersécurité',    value: 85 },
  { name: 'SQL / Data',       value: 80 },
  { name: 'NLP',              value: 80 },
  { name: 'JavaScript',       value: 75 },
  { name: 'Adaptabilité',     value: 92 },
]

const TOOLS = [
  'Burp Suite', 'Git', 'VS Code', 'Jupyter',
  'Docker', 'Linux', 'Streamlit', 'spaCy', 'scikit-learn',
]

/**
 * @param {function} onShowToast
 */
export default function MonPro({ onShowToast }) {
  // Barres de compétences animées au montage (100ms comme l'original)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href    = CV_PDF
    link.download = 'CV_Idriss_Abdellaoui.pdf'
    link.click()
    onShowToast('📄 CV téléchargé !')
  }

  return (
    <div className="page active">
      <div className="monpro-page-inner">

        {/* ── Colonne carte + bouton CV ── */}
        <div className="monpro-card-col">
          <div className="mp-card-anim">
            <PlayerCard data={idriss_pro} sizeClass="pc-lg" noHover />
          </div>
          <button className="mp-cv-btn" onClick={handleDownloadCV}>
            <DownloadIcon />
            Télécharger CV
          </button>
        </div>

        {/* ── Blocs d'info ── */}
        <div className="monpro-info">

          {/* À Propos */}
          <div className="info-block">
            <h3>À Propos</h3>
            <div className="bio-grid">
              {BIO_ITEMS.map(b => (
                <div key={b.l} className="bi">
                  <div className="bil">{b.l}</div>
                  <div
                    className="biv"
                    style={{
                      ...(b.small && { fontSize: '11px' }),
                      ...(b.green && { color: 'var(--green)' }),
                      ...(b.gold  && { color: 'var(--gold-l)' }),
                    }}
                  >
                    {b.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compétences */}
          <div className="info-block">
            <h3>Compétences</h3>
            {SKILLS.map(s => (
              <div key={s.name} className="skill-row">
                <span className="sk-name">{s.name}</span>
                <div className="sk-track">
                  <div
                    className="sk-fill"
                    style={{ width: animated ? `${s.value}%` : '0%' }}
                  />
                </div>
                <span className="sk-val">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Outils */}
          <div className="info-block">
            <h3>Outils</h3>
            <div className="tools-chips">
              {TOOLS.map(tool => (
                <div key={tool} className="tool-chip">{tool}</div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg
      width="13" height="13"
      viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}