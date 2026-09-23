// ─────────────────────────────────────────────────────────────
//  src/components/Topbar.jsx
//  Barre du haut : nom du club + compteur de pièces.
//  Styles : global.css (importé dans main.jsx)
// ─────────────────────────────────────────────────────────────

/**
 * @param {number} coins — montant courant de pièces FC
 */
export default function Topbar({ coins }) {
  return (
    <div className="topbar">

      {/* ── Gauche : nom du club ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="tb-club">
          IDRISS FC{' '}
          <span style={{ color: 'var(--gold)' }}>27</span>
        </div>
        <span style={{ fontSize: '10px', color: 'var(--dim)' }}>
          • Est. Marseille 2025
        </span>
      </div>

      {/* ── Droite : pièces + pseudo ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="coins-wrap">
          <div className="coin-icon" />
          {/* toLocaleString donne "170 528" avec espaces — identique à l'original */}
          <span>{coins.toLocaleString('fr-FR')}</span>
        </div>
        <div className="tb-user">idriss fc</div>
      </div>

    </div>
  );
}