// ─────────────────────────────────────────────────────────────
//  src/components/PlayerCard.jsx
//  Remplace la fonction makeCard() du vanilla JS.
//  Composant pur (presentational) : reçoit les données, affiche.
// ─────────────────────────────────────────────────────────────

import '../styles/PlayerCard.css';
import { ICONS } from '../data/projectsData';

/**
 * @param {object}        data       — projet ou idriss_pro
 * @param {string}        sizeClass  — 'pc-xs' | 'pc-sm' | 'pc-md' | 'pc-lg'
 * @param {function|null} onClick    — callback optionnel (ouvre la modale)
 * @param {boolean}       noHover    — ajoute la classe .no-hover
 */
export default function PlayerCard({
  data,
  sizeClass = 'pc-sm',
  onClick   = null,
  noHover   = false,
}) {
  // ── Hauteur/margin du séparateur selon la taille ───────────
  const dividerStyle = {
    height: sizeClass === 'pc-md' || sizeClass === 'pc-lg' ? '3px' : '1px',
    margin:
      sizeClass === 'pc-xs' ? '1px 0'
      : sizeClass === 'pc-sm' ? '2px 0'
      : '3px 0',
  };

  return (
    <div
      className={[
        'player-card',
        data.cardClass,
        sizeClass,
        noHover ? 'no-hover' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick ?? undefined}
    >
      <div className="card-inner">

        {/* ── Rating · Position · Drapeau ── */}
        <div className="card-top-row">
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: '1px' }}>
            <div className="c-rating">{data.rating}</div>
            <div className="c-pos">{data.pos}</div>
          </div>
          <div className="c-flag">{data.flag}</div>
        </div>

        {/* ── Icône SVG (string SVG provenant de projectsData) ── */}
        <div
          className="card-img"
          dangerouslySetInnerHTML={{ __html: ICONS[data.icon] ?? '' }}
        />

        {/* ── Nom ── */}
        <div className="c-name">{data.name}</div>

        {/* ── Séparateur ── */}
        <div className="card-divider" style={dividerStyle} />

        {/* ── Stats (6 cases) ── */}
        <div className="card-stats">
          {(data.stats ?? []).map((s, i) => (
            <div key={i} className="c-stat">
              <span className="sv">{s.v}</span>
              <span className="sl">{s.l}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}