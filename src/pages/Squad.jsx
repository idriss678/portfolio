// ─────────────────────────────────────────────────────────────
//  pages/Squad.jsx — Terrain de jeu + formation 4-3-2-1
// ─────────────────────────────────────────────────────────────
import PlayerCard from '../components/PlayerCard.jsx'
import { pitchSlots, projects } from '../data/projectsData.js'

/**
 * @param {function} onOpenModal — ouvre la modale d'un projet (projectId)
 */
export default function Squad({ onOpenModal }) {
  return (
    <div
      className="page-flex active"
      style={{ flexDirection: 'column', padding: '12px' }}
    >
      {/* ── Header ── */}
      <div className="eq-header">
        <div className="ptitle" style={{ marginBottom: 0 }}>
          Mon <span>Équipe</span>
        </div>
        <div className="eq-meta">
          <div className="formation-badge">4-3-2-1</div>
          <div className="chem-info">Chimie <span>33/33</span></div>
          <div className="rating-info">Note <strong>91</strong> ★★★★★</div>
        </div>
      </div>

      {/* ── Terrain ── */}
      <div className="pitch">
        {/* Lignes décoratives */}
        <div className="pitch-line-h" />
        <div className="pitch-circle" />
        <div className="pitch-box-top" />
        <div className="pitch-box-bot" />

        {/* Slots joueurs */}
        {pitchSlots.map((slot, idx) => {
          const project = slot.proj ? projects[slot.proj] : null

          return (
            <div
              key={idx}
              className="pitch-slot"
              style={{ left: slot.left, top: slot.top }}
            >
              {project ? (
                <>
                  <PlayerCard
                    data={project}
                    sizeClass="pc-sm"
                    onClick={() => onOpenModal(slot.proj)}
                  />
                  <div className="slot-label">{slot.label}</div>
                  <div className="chem-pip">
                    <span /><span /><span />
                  </div>
                </>
              ) : (
                <>
                  {/* Slot vide */}
                  <div className="player-card empty-slot pc-sm">
                    <div
                      className="card-inner"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.1)' }}>
                        +
                      </span>
                      <span
                        style={{
                          fontFamily: 'Barlow Condensed',
                          fontSize: '7px',
                          color: 'rgba(255,255,255,0.15)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {slot.label}
                      </span>
                    </div>
                  </div>
                  <div className="slot-label">{slot.label}</div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}