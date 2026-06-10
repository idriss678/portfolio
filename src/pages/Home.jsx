// ─────────────────────────────────────────────────────────────
//  pages/Home.jsx
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'

// ── Données statiques extraites du HTML original ──────────────
const SEASON_SKILLS = [
  { label: 'Python / ML',   value: 88 },
  { label: 'Cybersécurité', value: 85 },
  { label: 'Data / SQL',    value: 82 },
  { label: 'JavaScript',    value: 75 },
  { label: 'NLP / spaCy',   value: 80 },
]

const STAT_CHIPS = [
  { v: '7',  l: 'Projets'  },
  { v: '6+', l: 'Langages' },
  { v: '83', l: 'OVR'      },
  { v: 'B2', l: 'Anglais'  },
]

const ACTIVITIES = [
  { color: 'var(--purple)', text: 'Save Your Friends — Bot NLP anti-harcèlement (Mistral LLM)',   date: '2026' },
  { color: 'var(--gold)',   text: 'TARDIS — Prédiction retards SNCF, Dashboard Streamlit ML',     date: '2026' },
  { color: '#7080e8',       text: 'Alice in Wonderland — Moteur NLP, similarité cosinus',          date: '2026' },
  { color: 'var(--green)',  text: 'Product Design — DRIPDAY, app sociale de gestion de dressing',  date: '2026' },
  { color: 'var(--red)',    text: 'Hack & Juice — Pentest OWASP, audit cybersécurité',             date: '2026' },
  { color: '#ff8c20',       text: 'La Piscine Epitech — Immersion intensive 10–15h/jour',          date: '2025' },
]

export default function Home() {
  // Déclenche les barres de progression après 400ms (identique à l'original)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page active">
      <div className="ptitle">Bienvenue sur <span>Mon Portfolio</span></div>

      <div className="home-grid">

        {/* ── Carte de bienvenue ── */}
        <div className="hcard welcome-card">
          <h2>Idriss <span>Abdellaoui</span></h2>
          <p>
            Étudiant en 1ère année à{' '}
            <strong style={{ color: 'var(--text)' }}>Epitech</strong>, orienté vers
            l'ingénierie des données et l'Intelligence Artificielle. Passionné par les
            modèles prédictifs, la cybersécurité et la conception de produits.
            Recherche stage 1–2 mois.
          </p>
          <div className="stat-chips">
            {STAT_CHIPS.map(chip => (
              <div key={chip.l} className="chip">
                <div className="cv">{chip.v}</div>
                <div className="cl">{chip.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Carte saison / barres de progression ── */}
        <div className="hcard season-card">
          <h3>Saison en cours</h3>
          <div className="sn">Epitech Bachelor</div>
          <div className="ss">2025 – En cours •</div>

          {SEASON_SKILLS.map(skill => (
            <div key={skill.label} className="prog-section">
              <div className="pl">
                <span>{skill.label}</span>
                <span>{skill.value}</span>
              </div>
              <div className="prog-track">
                <div
                  className="prog-fill"
                  style={{ width: animated ? `${skill.value}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Activité récente ── */}
        <div className="hcard" style={{ gridColumn: '1/3' }}>
          <h3>Activité Récente</h3>
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="act-item">
              <div className="act-dot" style={{ background: a.color }} />
              <span className="act-text">{a.text}</span>
              <span className="act-date">{a.date}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}