// ─────────────────────────────────────────────────────────────
//  pages/Evolutions.jsx
// ─────────────────────────────────────────────────────────────
import { evolutions } from '../data/projectsData.js'

export default function Evolutions() {
  return (
    <div className="page active">
      <div className="ptitle">Mes <span>Évolutions</span></div>
      <p style={{ fontSize: '12px', color: 'var(--dim)', marginBottom: '16px' }}>
        Projets futurs à réaliser — Ces évolutions seront débloquées au fil de votre progression.
      </p>

      <div className="evo-grid">
        {evolutions.map(evo => (
          <div key={evo.name} className="evo-card">
            <div className="evo-locked">🔒</div>
            <div className="evo-name">{evo.name}</div>
            <div className="evo-type">{evo.type}</div>
            <div className="evo-req">
              <strong>Condition :</strong>
              <br />
              {evo.req}
            </div>
            <div className="evo-stats">
              {evo.boost.map(b => (
                <div key={b.s} className="evo-stat">
                  {b.s} <span>{b.v}</span>
                </div>
              ))}
            </div>
            <div className="evo-coming">⏳ {evo.when}</div>
          </div>
        ))}
      </div>
    </div>
  )
}