// ─────────────────────────────────────────────────────────────
//  src/components/Toast.jsx
//  Notification temporaire bas-droite.
//
//  IMPORTANT : ce composant reste TOUJOURS dans le DOM.
//  La classe 'show' déclenche la CSS transition (translateY + opacity).
//  Styles : global.css (importé dans main.jsx)
// ─────────────────────────────────────────────────────────────

/**
 * @param {string}  message — texte à afficher
 * @param {boolean} visible — true → classe 'show' → animation entrée
 */
export default function Toast({ message, visible }) {
  return (
    <div className={`toast${visible ? ' show' : ''}`}>
      {message}
    </div>
  );
}