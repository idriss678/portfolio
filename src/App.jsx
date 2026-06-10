// ─────────────────────────────────────────────────────────────
//  App.jsx — Orchestrateur principal
//  Gère : intro pack / navigation / toast / modal / coins
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'

import PackOpening from './components/PackOpening.jsx'
import Sidebar     from './components/Sidebar.jsx'
import Topbar      from './components/Topbar.jsx'
import Toast       from './components/Toast.jsx'
import Modal       from './components/Modal.jsx'

import Home        from './pages/Home.jsx'
import Squad       from './pages/Squad.jsx'
import MonPro      from './pages/MonPro.jsx'
import Sbc         from './pages/Sbc.jsx'
import Evolutions  from './pages/Evolutions.jsx'
import Boutique    from './pages/Boutique.jsx'
import Club        from './pages/Club.jsx'
import Contact     from './pages/Contact.jsx'

import { projects } from './data/projectsData.js'

// ── Clé localStorage (identique à l'original) ─────────────────
const STORAGE_KEY = 'idriss_portfolio_opened'

export default function App() {

  // ── A-t-on déjà vu l'intro ? (lecture immédiate au montage) ──
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    try { return !!localStorage.getItem(STORAGE_KEY) } catch { return false }
  })

  // ── Contrôle le fade-in du #app (transition CSS opacity) ─────
  const [appReady, setAppReady] = useState(false)

  // ── Navigation ────────────────────────────────────────────────
  const [activePage, setActivePage] = useState('home')

  // ── Pièces FC (partagées entre Topbar et Boutique) ────────────
  const [coins, setCoins] = useState(170_528)

  // ── Boutique : "acquis" persiste entre navigations ────────────
  const [featuredBought, setFeaturedBought] = useState(false)

  // ── Toast ─────────────────────────────────────────────────────
  const [toast, setToast] = useState({ message: '', visible: false })

  // ── Modale projet ─────────────────────────────────────────────
  const [modalProject, setModalProject] = useState(null)

  // ──────────────────────────────────────────────────────────────
  //  Effet : body.app-visible + fade-in #app quand l'appli s'affiche
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hasSeenIntro) return

    document.body.classList.add('app-visible')

    // Décalage d'1 frame pour que la CSS transition opacity joue
    const raf = requestAnimationFrame(() =>
      setTimeout(() => setAppReady(true), 30)
    )
    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('app-visible')
    }
  }, [hasSeenIntro])

  // ──────────────────────────────────────────────────────────────
  //  Callbacks — passés aux composants enfants
  // ──────────────────────────────────────────────────────────────

  /** Affiche une notification 3 secondes */
  const showToast = (msg) => {
    setToast({ message: msg, visible: true })
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000)
  }

  /** Navigue vers une page */
  const navigateTo = (page) => setActivePage(page)

  /** Ouvre la modale d'un projet */
  const openModal = (projectId) => {
    const p = projects[projectId]
    if (p) setModalProject(p)
  }

  /** Ferme la modale */
  const closeModal = () => setModalProject(null)

  /**
   * Achat dans la Boutique
   * Retourne true si succès, false si fonds insuffisants
   */
  const handleBuy = (price) => {
    if (coins < price) {
      showToast('❌ Pièces insuffisantes !')
      return false
    }
    setCoins(c => c - price)
    return true
  }

  /** Achat de la carte vedette Save Your Friends */
  const handleBuyFeatured = () => {
    if (featuredBought) return
    const ok = handleBuy(45_000)
    if (ok) {
      setFeaturedBought(true)
      showToast('🏆 Save Your Friends ajouté !')
    }
  }

  /** Appelé par PackOpening quand l'utilisateur clique "CONSTRUIRE" */
  const handleEnterApp = () => {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
    setHasSeenIntro(true)
    setActivePage('sbc') // comme l'original : atterrissage sur le SBC
  }

  /** Appelé par Sbc quand la carte pro est débloquée */
  const handleSbcComplete = () => navigateTo('monpro')

  // ──────────────────────────────────────────────────────────────
  //  Routeur de pages (switch remplace getElementById + classList)
  // ──────────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />
      case 'equipe':
        return <Squad onOpenModal={openModal} />
      case 'monpro':
        return <MonPro onShowToast={showToast} />
      case 'sbc':
        return <Sbc onComplete={handleSbcComplete} onShowToast={showToast} />
      case 'evolutions':
        return <Evolutions />
      case 'boutique':
        return (
          <Boutique
            coins={coins}
            featuredBought={featuredBought}
            onBuyFeatured={handleBuyFeatured}
            onOpenModal={openModal}
            onShowToast={showToast}
          />
        )
      case 'club':
        return <Club />
      case 'contact':
        return <Contact onShowToast={showToast} />
      default:
        return <Home />
    }
  }

  // ──────────────────────────────────────────────────────────────
  //  Rendu
  // ──────────────────────────────────────────────────────────────

  // Intro : on masque complètement l'app pendant le pack opening
  if (!hasSeenIntro) {
    return <PackOpening onEnterApp={handleEnterApp} />
  }

  // Application principale
  return (
    <div id="app" className={appReady ? 'visible' : ''}>

      <Sidebar activePage={activePage} onNavigate={navigateTo} />

      <div className="main">
        <Topbar coins={coins} />

        <div className="content">
          {renderPage()}
        </div>
      </div>

      {/* Toujours dans le DOM — la classe 'show' déclenche l'animation */}
      <Toast message={toast.message} visible={toast.visible} />

      {/* Null si pas de projet sélectionné */}
      <Modal project={modalProject} onClose={closeModal} />

    </div>
  )
}