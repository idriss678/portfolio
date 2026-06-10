// ─────────────────────────────────────────────────────────────
//  pages/Boutique.jsx
// ─────────────────────────────────────────────────────────────
import { useMemo } from 'react'
import PlayerCard from '../components/PlayerCard.jsx'
import { projects } from '../data/projectsData.js'

const FEATURED_ID    = 'syf'
const FEATURED_PRICE = 45_000
const MORE_IDS       = ['tardis', 'alice', 'dripday', 'hj', 'nb', 'piscine']

/**
 * @param {number}   coins
 * @param {boolean}  featuredBought
 * @param {function} onBuyFeatured
 * @param {function} onOpenModal
 * @param {function} onShowToast
 */
export default function Boutique({
  coins,
  featuredBought,
  onBuyFeatured,
  onOpenModal,
}) {
  // Prix aléatoires stables (calculés une seule fois au montage via useMemo)
  const morePrices = useMemo(
    () =>
      MORE_IDS.reduce((acc, id) => {
        acc[id] = Math.floor(12_000 + Math.random() * 20_000)
        return acc
      }, {}),
    [] // deps vides → calculé une seule fois
  )

  return (
    <div className="page active">
      <div className="ptitle">La <span>Boutique</span></div>

      {/* ── Produit vedette ── */}
      <div className="boutique-featured">
        {/* Carte cliquable → ouvre la modale */}
        <div
          onClick={() => onOpenModal(FEATURED_ID)}
          style={{ cursor: 'pointer', flexShrink: 0 }}
        >
          <PlayerCard data={projects[FEATURED_ID]} sizeClass="pc-md" />
        </div>

        <div className="boutique-info">
          <div className="b-badge">⭐ Édition Spéciale</div>
          <div className="b-title">Save Your Friends</div>
          <div className="b-sub">
            Bot anti-harcèlement en Python avec architecture hybride (Regex, Detoxify, ML)
            et LLM local Mistral. 80 % de modération automatique, protection totale des données.
          </div>
          <div className="b-tags">
            {['Python', 'Machine Learning', 'NLP', 'Mistral LLM', 'Discord API'].map(tag => (
              <span key={tag} className="b-tag">{tag}</span>
            ))}
          </div>
          <div className="b-price">
            <div className="b-coins">
              <div className="coin-icon" />
              <span>{FEATURED_PRICE.toLocaleString('fr-FR')}</span>
            </div>
            <div className="b-price-label">pièces FC</div>
          </div>
          <button
            className={`btn-buy${featuredBought ? ' bought' : ''}`}
            onClick={onBuyFeatured}
            disabled={featuredBought}
          >
            {featuredBought ? '✓ Acquis !' : 'Acquérir ce Projet'}
          </button>
        </div>
      </div>

      {/* ── Autres projets ── */}
      <div className="boutique-more">
        <h3>Autres Projets Disponibles</h3>
        <div className="more-cards">
          {MORE_IDS.map(id => (
            <div
              key={id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <PlayerCard
                data={projects[id]}
                sizeClass="pc-sm"
                onClick={() => onOpenModal(id)}
              />
              {/* Prix sous la carte */}
              <div
                style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '10px',
                  color: 'var(--dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <div className="coin-icon" style={{ width: '10px', height: '10px' }} />
                {morePrices[id]?.toLocaleString('fr-FR')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}