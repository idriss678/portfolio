// ─────────────────────────────────────────────────────────────
//  src/components/PackOpening.jsx
//  Séquence d'intro complète (remplace pack screen + reveals + SBC unlock)
//
//  Machine à états : 'pack' → 'card-reveal' → 'sbc-unlock'
//  onEnterApp() est appelé quand l'utilisateur clique
//  "CONSTRUIRE MON ÉQUIPE" → App.jsx prend le relais.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import { projects, REVEAL_ORDER } from '../data/projectsData';
import PlayerCard from './PlayerCard';
import '../styles/PackOpening.css';

/**
 * @param {function} onEnterApp — appelé par App.jsx pour afficher le portfolio
 */
export default function PackOpening({ onEnterApp }) {

  // ── Machine à états de l'intro ────────────────────────────
  // 'pack'        → écran du pack, attend le clic
  // 'card-reveal' → révèle les cartes une par une
  // 'sbc-unlock'  → écran de transition final
  const [phase, setPhase] = useState('pack');

  // ── États internes de l'écran pack ────────────────────────
  const [packShaking, setPackShaking] = useState(false);
  const [hintText,    setHintText]    = useState('CLIQUEZ POUR OUVRIR');

  // ── États du reveal ───────────────────────────────────────
  const [revealIdx,  setRevealIdx]  = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [showFlash,  setShowFlash]  = useState(false);

  // revealIdxRef : version "ref" pour éviter les closures périmées
  // dans les callbacks de setTimeout
  const revealIdxRef = useRef(0);

  // ── Canvas de particules (uniquement sur l'écran pack) ────
  const canvasRef    = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Ne monte les particules que pendant la phase 'pack'
    if (phase !== 'pack') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // Génération des 60 particules
    const particles = Array.from({ length: 60 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      color: `hsla(${260 + Math.random() * 40},70%,${50 + Math.random() * 30}%,${
        (Math.random() * 0.5 + 0.1).toFixed(2)
      })`,
    }));

    // Boucle d'animation requestAnimationFrame
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y -= p.speed;
        // Recycle la particule en bas quand elle sort par le haut
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Nettoyage si le phase change (canvas démonte)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase]);

  // ── Helpers internes ──────────────────────────────────────

  /** Déclenche le flash + affiche la carte courante */
  const triggerRevealCard = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 600);
    setShowReveal(true);
  };

  // ── Handlers utilisateur ──────────────────────────────────

  /** Clic sur le pack → secousse → flash blanc → première carte */
  const handlePackClick = () => {
    if (packShaking) return; // Empêche le double-clic pendant l'animation

    setPackShaking(true);
    setHintText('⚡ OUVERTURE... ⚡');

    setTimeout(() => {
      setPackShaking(false);

      // Flash écran blanc (identique à l'original)
      document.body.style.background = '#fff';
      setTimeout(() => {
        document.body.style.background = '';

        // Initialise l'index et lance la première révélation
        revealIdxRef.current = 0;
        setRevealIdx(0);
        setPhase('card-reveal');
        triggerRevealCard();
      }, 80);
    }, 600);
  };

  /** Clic "CONTINUER" → cache la carte → attend 200ms → carte suivante ou sbc-unlock */
  const handleNextCard = () => {
    setShowReveal(false);

    const nextIdx = revealIdxRef.current + 1;

    setTimeout(() => {
      if (nextIdx < REVEAL_ORDER.length) {
        // Il reste des cartes à révéler
        revealIdxRef.current = nextIdx;
        setRevealIdx(nextIdx);
        triggerRevealCard();
      } else {
        // Toutes les cartes ont été révélées
        setPhase('sbc-unlock');
      }
    }, 200);
  };

  /** Clic "Passer tout" → cache l'overlay → sbc-unlock */
  const handleSkipAll = () => {
    setShowReveal(false);
    setTimeout(() => setPhase('sbc-unlock'), 200);
  };

  // ── Projet actuellement révélé ────────────────────────────
  const currentProject = projects[REVEAL_ORDER[revealIdx]] ?? null;

  // ── Rendu ─────────────────────────────────────────────────
  return (
    <>
      {/* ══════════════════════════════════════
          ÉCRAN PACK  (phase === 'pack')
      ══════════════════════════════════════ */}
      {phase === 'pack' && (
        <div id="pack-screen">
          <div className="pack-bg" />
          <canvas className="pack-particles" ref={canvasRef} />

          <div className="pack-wrap">
            <div className="pack-title">⚡ Nouveau Talent Disponible ⚡</div>

            {/* Pack cliquable */}
            <div
              className={`pack-visual${packShaking ? ' shake' : ''}`}
              onClick={handlePackClick}
            >
              <PackSvg />
            </div>

            <div className="pack-hint">{hintText}</div>
            <div className="pack-progress" />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          CARD REVEAL  (phase === 'card-reveal' ET showReveal)
          ─ Le composant se démonte entre chaque carte
            → les animations CSS rejouent à chaque montage
      ══════════════════════════════════════ */}
      {phase === 'card-reveal' && showReveal && currentProject && (
        <div id="card-reveal" className="active">

          {/* Flash lumineux */}
          {showFlash && <div className="reveal-flash" />}

          {/* Carte révélée */}
          <div className="reveal-card-wrap">
            <PlayerCard data={currentProject} sizeClass="pc-md" noHover />
          </div>

          {/* Nom + type */}
          <div className="reveal-name">{currentProject.name}</div>
          <div className="reveal-type">
            {currentProject.type}&nbsp;•&nbsp;{currentProject.rating}&nbsp;OVR
          </div>

          {/* Bouton continuer */}
          <button className="reveal-next-btn" onClick={handleNextCard}>
            CONTINUER →
          </button>

          {/* Passer tout */}
          <div className="reveal-skip" onClick={handleSkipAll}>
            Passer tout →
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════
          SBC UNLOCK  (phase === 'sbc-unlock')
      ══════════════════════════════════════ */}
      {phase === 'sbc-unlock' && (
        <div id="sbc-unlock" className="active">
          <div className="sbc-unlock-title">
            🏆 TOUS VOS PROJETS DÉBLOQUÉS !
          </div>
          <div className="sbc-unlock-sub">
            Combinez-les dans le Squad Build Challenge pour obtenir votre carte finale
          </div>
          <button className="sbc-start-btn" onClick={onEnterApp}>
            CONSTRUIRE MON ÉQUIPE →
          </button>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
//  Sous-composant : SVG du pack
//  Extrait pour alléger le JSX principal.
//  Tous les attributs kebab-case convertis en camelCase.
// ─────────────────────────────────────────────────────────────
function PackSvg() {
  return (
    <svg
      className="pack-svg"
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2a1a5a" />
          <stop offset="100%" stopColor="#0a0518" />
        </linearGradient>
        <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#5030a0" stopOpacity=".8" />
          <stop offset="50%"  stopColor="#9050e0" stopOpacity=".6" />
          <stop offset="100%" stopColor="#5030a0" stopOpacity=".8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Fond + bordures */}
      <rect width="200" height="280" rx="12" fill="url(#pg1)" stroke="#6040c0" strokeWidth="1.5" />
      <rect x="8" y="8" width="184" height="264" rx="9" fill="none" stroke="url(#pg2)" strokeWidth="1" />

      {/* Titre + sous-titre */}
      <text x="100" y="44"  textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="900" fontSize="22" fill="#c8a030" filter="url(#glow)">EPITECH</text>
      <text x="100" y="64"  textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="700" fontSize="11" fill="#8060c0" letterSpacing="3">TALENT PACK</text>

      {/* Séparateur haut */}
      <rect x="30" y="75" width="140" height="2" fill="url(#pg2)" />

      {/* Point d'interrogation mystère */}
      <text x="100" y="155" textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="900" fontSize="80" fill="#c8a030" filter="url(#glow)" opacity=".15">?</text>
      <text x="100" y="165" textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="900" fontSize="80" fill="#9060d0" opacity=".2">?</text>

      {/* Cercle pointillé */}
      <circle cx="100" cy="145" r="42" fill="none" stroke="#5030a0" strokeWidth="1.5" strokeDasharray="4 3" opacity=".6" />

      {/* Étoile */}
      <text x="100" y="152" textAnchor="middle" fontFamily="Barlow Condensed" fontSize="54" fill="#a070e0" opacity=".3">⭐</text>

      {/* Séparateur bas */}
      <rect x="30" y="195" width="140" height="2" fill="url(#pg2)" />

      {/* Description du contenu */}
      <text x="100" y="218" textAnchor="middle" fontFamily="Barlow Condensed" fontSize="11" fill="#6040a0">CONTIENT</text>
      <text x="100" y="234" textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="900" fontSize="16" fill="#d0a0ff">7 PROJETS RARES</text>
      <text x="100" y="254" textAnchor="middle" fontFamily="Barlow Condensed" fontSize="10" fill="#5030a0">+ 1 CARTE BRONZE GARANTIE</text>
    </svg>
  );
}