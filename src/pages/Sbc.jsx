// ─────────────────────────────────────────────────────────────
//  pages/Sbc.jsx — Squad Build Challenge
//  Contient aussi l'overlay de révélation de la carte pro.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import PlayerCard from '../components/PlayerCard.jsx'
import { projects, idriss_pro } from '../data/projectsData.js'

const SBC_TOTAL   = 8
const PROJECT_IDS = Object.keys(projects) // ordre naturel de l'objet

/**
 * @param {function} onComplete   — navigation vers MonPro après reveal
 * @param {function} onShowToast
 */
export default function Sbc({ onComplete, onShowToast }) {

  // placed : { [slotIndex: number]: projectId }
  const [placed,        setPlaced]        = useState({})
  const [sbcDone,       setSbcDone]       = useState(false)
  const [showSbcReveal, setShowSbcReveal] = useState(false)

  const placedIds  = Object.values(placed)
  const placedCount = placedIds.length
  const progress   = Math.round((placedCount / SBC_TOTAL) * 100)
  const isReady    = placedCount === SBC_TOTAL

  // ── Trouver le premier slot vide ──────────────────────────
  const findEmptySlot = () => {
    for (let i = 0; i < SBC_TOTAL; i++) {
      if (placed[i] === undefined) return i
    }
    return -1
  }

  // ── Clic sur une carte inventaire → la placer ─────────────
  const handlePlaceCard = (projectId) => {
    if (placedIds.includes(projectId)) return // déjà placée
    const slot = findEmptySlot()
    if (slot === -1) { onShowToast('⚠️ Plus de slots disponibles !'); return }
    setPlaced(prev => ({ ...prev, [slot]: projectId }))
  }

  // ── Clic sur un slot rempli → retirer la carte ────────────
  const handleRemoveFromSlot = (idx) => {
    if (placed[idx] === undefined) return
    setPlaced(prev => {
      const next = { ...prev }
      delete next[idx]
      return next
    })
  }

  // ── Soumettre le SBC ──────────────────────────────────────
  const handleSubmit = () => {
    if (sbcDone || !isReady) return
    setSbcDone(true)
    setShowSbcReveal(true)
    onShowToast('🏆 SBC complété ! Carte pro débloquée !')
  }

  // ── Fermer le reveal → navigation vers Mon Pro ────────────
  const handleCloseSbcReveal = () => {
    setShowSbcReveal(false)
    onComplete()
  }

  return (
    <div className="page active" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="sbc-layout">

        {/* ══════════════ Colonne gauche ══════════════ */}
        <div className="sbc-left">
          <div className="sbc-header">
            <div className="sbc-title">Squad Build <span>Challenge</span></div>
            <div className="sbc-desc">
              Placez vos projets dans les emplacements pour débloquer votre carte
              professionnelle finale
            </div>
          </div>

          {/* Plateau de 7 slots */}
          <div className="sbc-board">
            <div className="sbc-slots">
              <div className="sbc-slots-inner">
                {Array.from({ length: SBC_TOTAL }, (_, idx) => {
                  const projectId = placed[idx]
                  const project   = projectId ? projects[projectId] : null

                  return (
                    <div
                      key={idx}
                      className={`sbc-slot${project ? ' filled' : ''}`}
                      onClick={() => handleRemoveFromSlot(idx)}
                      title={project ? 'Cliquer pour retirer' : ''}
                    >
                      {project ? (
                        <PlayerCard data={project} sizeClass="pc-xs" noHover />
                      ) : (
                        <>
                          <div className="sbc-slot-plus">+</div>
                          <div className="sbc-slot-num">Slot {idx + 1}</div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════ Colonne droite ══════════════ */}
        <div className="sbc-right">

          {/* Inventaire */}
          <div className="sbc-inventory">
            <div className="sbc-inv-title">Inventaire — Vos Projets</div>
            <div className="sbc-inv-cards">
              {PROJECT_IDS.map(id => {
                const isUsed = placedIds.includes(id)
                return (
                  <div
                    key={id}
                    className={`sbc-inv-card${isUsed ? ' used' : ''}`}
                    onClick={() => handlePlaceCard(id)}
                    title={isUsed ? 'Déjà placé' : 'Cliquer pour placer'}
                  >
                    <PlayerCard data={projects[id]} sizeClass="pc-xs" noHover />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Barre de progression + bouton submit */}
          <div className="sbc-submit-area">
            <div className="sbc-progress-bar">
              <div className="sbc-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="sbc-progress-text">
              {placedCount} / {SBC_TOTAL} projets placés
            </div>
            <button
              className={`btn-sbc-submit${isReady ? ' ready' : ''}`}
              onClick={handleSubmit}
              disabled={!isReady}
            >
              Compléter le SBC
            </button>
          </div>

          {/* Récompense (floue jusqu'à complétion) */}
          <div className="sbc-reward">
            <div className="sbc-reward-label">⭐ Récompense</div>
            <div className={`sbc-reward-card${sbcDone ? ' unlocked' : ''}`}>
              <PlayerCard data={idriss_pro} sizeClass="pc-xs" noHover />
            </div>
            <div className={`sbc-done-msg${sbcDone ? ' visible' : ''}`}>
              ✓ Carte débloquée !
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════ Overlay de révélation (position: fixed) ══════════════ */}
      {showSbcReveal && (
        <div id="sbc-reveal-overlay" className="active">
          {/* Flash */}
          <div className="sbc-reveal-flash" />

          {/* Carte animée */}
          <div className="sbc-reveal-anim">
            <PlayerCard data={idriss_pro} sizeClass="pc-md" noHover />
          </div>

          <div className="sbc-reveal-title">CARTE DÉBLOQUÉE !</div>
          <div className="sbc-reveal-sub">Votre profil professionnel est prêt</div>

          <button className="sbc-close-btn" onClick={handleCloseSbcReveal}>
            VOIR MON PRO →
          </button>
        </div>
      )}
    </div>
  )
}