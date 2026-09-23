// ─────────────────────────────────────────────────────────────
//  pages/Club.jsx — Historique + photo d'équipe + stats
// ─────────────────────────────────────────────────────────────
import { TEAM_PHOTO } from '../data/projectsData.js'

const TIMELINE = [
  {
    date:  '2022 – 2025',
    title: 'Lycée Simone Veil',
    desc:  "Baccalauréat général, bases scientifiques et découverte de l'informatique.",
  },
  {
    date:  'Été 2025',
    title: 'Stage — Site LOGIRAZ',
    desc:  "Développement du site vitrine d'une entreprise de transport et logistique (Auvergne-Rhône-Alpes) : présentation des services, de la flotte et des entrepôts.",
    link:  'https://idriss678.github.io/logiraz-preview/',
  },
  {
    date:  'Sept 2025',
    title: 'La Piscine Epitech',
    desc:  "Marathon d'apprentissage 10–15h/jour. Maîtrise de la POO, fichiers complexes, logique algorithmique.",
  },
  {
    date:  '2025 →',
    title: 'Epitech Bachelor',
    desc:  "Programme Bachelor en informatique. Spécialisation Data & IA, cybersécurité, développement web.",
  },
]

const CLUB_STATS = [
  { color: 'var(--gold)',   label: 'Projets complétés',    value: '7',    valueColor: 'var(--gold-l)' },
  { color: 'var(--green)',  label: 'Commits GitHub',        value: '200+', valueColor: 'var(--green)'  },
  { color: 'var(--purple)', label: 'Heures de code / sem.', value: '40+',  valueColor: 'var(--purple)' },
  { color: 'var(--red)',    label: 'Cafés consommés',       value: '∞',    valueColor: 'var(--red)'    },
]

export default function Club() {
  return (
    <div className="page active">
      <div className="ptitle">Club &amp; <span>Historique</span></div>

      <div className="club-layout">

        {/* ── Photo de groupe (pleine largeur) ── */}
        <div className="club-card full">
          <div className="fav-group-frame">
            <div className="fav-group-title">⚡ L'Équipe des Ténèbres</div>
            <div className="fav-group-sub">Groupe préféré • Epitech 2025–2026</div>
            <img
              className="fav-group-img"
              src={TEAM_PHOTO}
              alt="L'équipe des ténèbres — Epitech"
            />
            <div className="club-photo-label">
              Dans les tranchées du code — Epitech
            </div>
          </div>
        </div>

        {/* ── Timeline parcours ── */}
        <div className="club-card">
          <h3>Parcours</h3>
          <div className="timeline">
            {TIMELINE.map(t => (
              <div key={t.title} className="tl-item">
                <div className="tl-date">{t.date}</div>
                <div className="tl-title">{t.title}</div>
                <div className="tl-desc">{t.desc}</div>
                {t.link && (
                  <a
                    className="modal-link"
                    href={t.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: '6px' }}
                  >
                    Voir le site →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats du club ── */}
        <div className="club-card">
          <h3>Stats du Club</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CLUB_STATS.map(s => (
              <div key={s.label} className="act-item">
                <div className="act-dot" style={{ background: s.color }} />
                <span className="act-text">{s.label}</span>
                <span
                  className="act-date"
                  style={{
                    color:      s.valueColor,
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize:   '18px',
                    fontWeight: 900,
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}