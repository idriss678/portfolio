// ─────────────────────────────────────────────────────────────
//  src/components/Sidebar.jsx
//  Barre de navigation latérale.
//  Styles : global.css (importé dans main.jsx — pas de ré-import)
// ─────────────────────────────────────────────────────────────

// ── Configuration de la nav (ordre d'affichage) ───────────────
// type 'sep' = séparateur visuel
const NAV_CONFIG = [
  { type: 'item', page: 'home',       label: 'Accueil'  },
  { type: 'item', page: 'equipe',     label: 'Équipe'   },
  { type: 'sep' },
  { type: 'item', page: 'monpro',     label: 'Mon Pro'  },
  { type: 'item', page: 'sbc',        label: 'SBC'      },
  { type: 'item', page: 'evolutions', label: 'Évol.'    },
  { type: 'sep' },
  { type: 'item', page: 'boutique',   label: 'Boutique' },
  { type: 'item', page: 'club',       label: 'Club'     },
  { type: 'sep' },
  { type: 'item', page: 'contact',    label: 'Contact'  },
];

// ── Icônes SVG inline (JSX) ───────────────────────────────────
// Identiques à l'original HTML — converties en JSX (strokeWidth, etc.)
const NAV_ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  equipe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  monpro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  sbc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  evolutions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  boutique: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  club: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

/**
 * @param {string}   activePage  — page courante (ex: 'home')
 * @param {function} onNavigate  — callback(pageName) appelé au clic
 */
export default function Sidebar({ activePage, onNavigate }) {
  return (
    <nav className="sidebar">

      {/* ── Logo ── */}
      <div className="sb-logo">
        <svg viewBox="0 0 38 38" fill="none">
          <polygon
            points="19,2 36,10 36,28 19,36 2,28 2,10"
            fill="#1a2a50"
            stroke="rgba(197,160,48,.55)"
            strokeWidth="1.5"
          />
          <text
            x="19" y="25"
            textAnchor="middle"
            fontFamily="Barlow Condensed"
            fontWeight="900"
            fontSize="13"
            fill="#c8a030"
          >
            IA
          </text>
        </svg>
      </div>

      {/* ── Éléments de nav + séparateurs ── */}
      {NAV_CONFIG.map((item, idx) => {
        if (item.type === 'sep') {
          return <div key={`sep-${idx}`} className="sb-sep" />;
        }

        return (
          <button
            key={item.page}
            className={`nav-item${activePage === item.page ? ' active' : ''}`}
            onClick={() => onNavigate(item.page)}
            aria-label={item.label}
            aria-current={activePage === item.page ? 'page' : undefined}
          >
            {NAV_ICONS[item.page]}
            {item.label}
          </button>
        );
      })}

    </nav>
  );
}