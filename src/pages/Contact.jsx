// ─────────────────────────────────────────────────────────────
//  pages/Contact.jsx — Infos pro + formulaire de contact
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'

const CONTACT_ITEMS = [
  {
    label: 'Email',
    value: 'idriss.abdellaoui@epitech.eu',
    link:  'mailto:idriss.abdellaoui@epitech.eu',
  },
  { label: 'Tél',     value: '07.83.35.42.34' },
  { label: 'Lieu',    value: 'Marseille et alentour' },
  {
    label: 'GitHub',
    value: 'github.com/idriss678',
    link:  'https://github.com/idriss678',
  },
  {
    label:   'Recherche',
    value:   'Stage de 4 mois',
    style:   { color: 'var(--green)', fontWeight: 600 },
  },
]

/**
 * @param {function} onShowToast
 */
export default function Contact({ onShowToast }) {
  const [name,  setName]  = useState('')
  const [email, setEmail] = useState('')
  const [msg,   setMsg]   = useState('')

  const handleSend = async () => {
    if (!name.trim() || !email.trim()) {
      onShowToast('⚠️ Nom et email requis.')
      return
    }

    try {
      await fetch('https://formspree.io/f/xkoazzvn', {
        method: 'POST',
        body: JSON.stringify({ name, email, message: msg }),
        headers: { 'Content-Type': 'application/json' },
      })
      
      // TODO: intégrer un vrai service d'envoi (EmailJS, Formspree…)
      onShowToast('✅ Message envoyé à Idriss !')
      setName('')
      setEmail('')
      setMsg('')
    } catch (error) {
      onShowToast('❌ Une erreur est survenue lors de l\'envoi.')
    }
  }

  // Identique au resetPack() vanilla : vide le localStorage et recharge
  const handleResetPack = () => {
    localStorage.removeItem('idriss_portfolio_opened')
    window.location.reload()
  }

  return (
    <div className="page active">
      <div className="ptitle">Me <span>Contacter</span></div>

      <div className="contact-grid">

        {/* ── Informations de contact ── */}
        <div className="cblock">
          <h3>Infos <span>Pro</span></h3>
          {CONTACT_ITEMS.map(item => (
            <div key={item.label} className="c-item">
              <div className="c-label">{item.label}</div>
              <div className="c-value" style={item.style ?? {}}>
                {item.link ? (
                    <a
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    >
                    {item.value}
                    </a>
                ) : (
                    item.value
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Formulaire ── */}
        <div className="cblock">
          <h3>M'envoyer un <span>Message</span></h3>

          <label className="flabel" htmlFor="c-name">Nom complet</label>
          <input
            id="c-name"
            className="finput"
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label className="flabel" htmlFor="c-email">Email</label>
          <input
            id="c-email"
            className="finput"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label className="flabel" htmlFor="c-msg">Message</label>
          <textarea
            id="c-msg"
            className="finput"
            rows={4}
            placeholder="Proposition de stage..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />

          <button className="btn-send" onClick={handleSend}>
            Envoyer →
          </button>

          {/* Bouton caché : rejouer l'intro (debug / démo) */}
          <button
            onClick={handleResetPack}
            style={{
              background:   'rgba(255,255,255,0.05)',
              border:       '1px solid rgba(255,255,255,0.1)',
              borderRadius: '5px',
              padding:      '6px 12px',
              color:        'var(--dim)',
              fontFamily:   '"Barlow Condensed", sans-serif',
              fontSize:     '11px',
              cursor:       'pointer',
              marginTop:    '10px',
              display:      'block',
            }}
          >
            🎴 Rejouer l'intro
          </button>
        </div>

      </div>
    </div>
  )
}