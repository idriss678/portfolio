// ─────────────────────────────────────────────
//  src/data/projectsData.js
//  Toutes les données statiques du portfolio
// ─────────────────────────────────────────────

export const TEAM_PHOTO = "team_photo.jpeg";
export const CV_PDF     = "CV_Epitech_Stage.pdf";

// ── SVG inline icons ──────────────────────────
export const ICONS = {
  shield: `<svg viewBox="0 0 40 40" fill="none"><path d="M20 4L34 10L34 22Q34 33 20 38Q6 33 6 22L6 10Z" fill="rgba(0,0,0,0.3)" stroke="rgba(0,0,0,0.15)"/><circle cx="20" cy="18" r="5.5" fill="rgba(0,0,0,0.28)"/><path d="M12.5 28Q16 25 20 25Q24 25 27.5 28" stroke="rgba(0,0,0,0.28)" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  chart:  `<svg viewBox="0 0 40 40" fill="none"><rect x="3" y="22" width="7" height="14" rx="1.5" fill="rgba(0,0,0,0.3)"/><rect x="16.5" y="13" width="7" height="23" rx="1.5" fill="rgba(0,0,0,0.3)"/><rect x="30" y="7" width="7" height="29" rx="1.5" fill="rgba(0,0,0,0.3)"/><polyline points="6.5,20 20,11 33.5,5" stroke="rgba(0,0,0,0.2)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  lock:   `<svg viewBox="0 0 40 40" fill="none"><rect x="6" y="17" width="28" height="20" rx="3" fill="rgba(0,0,0,0.3)"/><path d="M13 17V12A7 7 0 0127 12V17" stroke="rgba(0,0,0,0.3)" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="20" cy="26" r="3.5" fill="rgba(0,0,0,0.27)"/><rect x="18.5" y="26" width="3" height="5" rx="1.5" fill="rgba(0,0,0,0.27)"/></svg>`,
  book:   `<svg viewBox="0 0 40 40" fill="none"><rect x="5" y="6" width="22" height="30" rx="2" fill="rgba(0,0,0,0.28)"/><rect x="13" y="6" width="22" height="30" rx="2" fill="rgba(0,0,0,0.2)"/><line x1="10" y1="14" x2="20" y2="14" stroke="rgba(0,0,0,0.3)" stroke-width="2" stroke-linecap="round"/><line x1="10" y1="19" x2="22" y2="19" stroke="rgba(0,0,0,0.3)" stroke-width="2" stroke-linecap="round"/><line x1="10" y1="24" x2="18" y2="24" stroke="rgba(0,0,0,0.3)" stroke-width="2" stroke-linecap="round"/></svg>`,
  design: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" fill="rgba(0,0,0,0.25)"/><path d="M14 20 Q20 10 26 20 Q20 30 14 20Z" fill="rgba(0,0,0,0.3)"/><circle cx="20" cy="20" r="3.5" fill="rgba(0,0,0,0.35)"/></svg>`,
  person: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="13" r="9" fill="rgba(0,0,0,0.28)"/><path d="M4 38Q6 26 20 26Q34 26 36 38" fill="rgba(0,0,0,0.28)"/></svg>`,
  fish:   `<svg viewBox="0 0 40 40" fill="none"><ellipse cx="18" cy="20" rx="13" ry="8" fill="rgba(0,0,0,0.28)"/><path d="M31 20 L38 13 L38 27 Z" fill="rgba(0,0,0,0.25)"/><circle cx="13" cy="18" r="2" fill="rgba(0,0,0,0.4)"/></svg>`,
  star:   `<svg viewBox="0 0 40 40" fill="none"><polygon points="20,4 24,16 36,16 27,23 30,36 20,29 10,36 13,23 4,16 16,16" fill="rgba(0,0,0,0.28)" stroke="rgba(0,0,0,0.15)" stroke-width="1"/></svg>`,
};

// ── Projets ────────────────────────────────────
export const projects = {
  piscine: {
    id: 'piscine',
    name: 'La Piscine',
    type: 'Fondamentaux C',
    rating: 78,
    pos: 'GK',
    cardClass: 'bronze',
    icon: 'fish',
    flag: '🇫🇷',
    desc: "Marathon d'apprentissage ultra-intense à Epitech, 10–15h/jour. Maîtrise de la programmation orientée objet, manipulation de fichiers complexes, algorithmique. Immersion totale qui forge la persévérance et l'autonomie du développeur.",
    tags: ['C', 'Algorithmique', 'POO', 'Fichiers', 'Unix'],
    stats:    [{ v:78,l:'C' },{ v:80,l:'ALGO' },{ v:75,l:'UNIX' },{ v:82,l:'LOGI' },{ v:76,l:'DBG' },{ v:79,l:'PRS' }],
    detStats: [{ v:78,l:'Langage C' },{ v:80,l:'Algorithmique' },{ v:75,l:'Unix/Shell' },{ v:82,l:'Logique' },{ v:76,l:'Débogage' },{ v:79,l:'Persévérance' }],
    pitch: { left:'50%', top:'92%' },
    pitchLabel: 'GK',
    github: 'https://github.com/idriss678',
  },
  tardis: {
    id: 'tardis',
    name: 'TARDIS',
    type: 'Data / ML',
    rating: 87,
    pos: 'CB',
    cardClass: 'gold',
    icon: 'chart',
    flag: '🇫🇷',
    desc: "Service d'analyse de données SNCF. Nettoyage EDA, modèles ML (Random Forest, XGBoost) pour prédire les retards de trains. Dashboard Streamlit interactif avec filtres dynamiques et métriques RMSE/MAE/R².",
    tags: ['Python','pandas','scikit-learn','Streamlit','EDA'],
    stats:    [{ v:88,l:'PY' },{ v:85,l:'ML' },{ v:87,l:'DATA' },{ v:90,l:'VIZ' },{ v:83,l:'SQL' },{ v:84,l:'SCI' }],
    detStats: [{ v:88,l:'Python' },{ v:85,l:'Machine Learning' },{ v:87,l:'Data Cleaning' },{ v:90,l:'Visualisation' },{ v:83,l:'SQL' },{ v:84,l:'Scikit-learn' }],
    pitch: { left:'35%', top:'68%' },
    pitchLabel: 'CB',
    github: 'https://github.com/idriss678',
  },
  alice: {
    id: 'alice',
    name: 'Alice NLP',
    type: 'NLP Engine',
    rating: 85,
    pos: 'CM',
    cardClass: 'special',
    icon: 'book',
    flag: '🇫🇷',
    desc: "Moteur NLP analysant les livres Project Gutenberg. Extraction diversité lexicale, personnages et lieux via spaCy. Résumé automatisé par templates, similarité cosinus pour recommandations, métadonnées via fichiers RDF.",
    tags: ['Python','spaCy','NLP','TF-IDF','Gutenberg'],
    stats:    [{ v:85,l:'NLP' },{ v:88,l:'SPY' },{ v:83,l:'TXT' },{ v:80,l:'RDF' },{ v:86,l:'COS' },{ v:82,l:'CLI' }],
    detStats: [{ v:85,l:'NLP' },{ v:88,l:'spaCy' },{ v:83,l:'Text Mining' },{ v:80,l:'RDF / API' },{ v:86,l:'Similarité cosinus' },{ v:82,l:'CLI Python' }],
    pitch: { left:'62%', top:'42%' },
    pitchLabel: 'CM',
    github: 'https://github.com/idriss678',
  },
  dripday: {
    id: 'dripday',
    name: 'DRIPDAY',
    type: 'Product Design',
    rating: 83,
    pos: 'LM',
    cardClass: 'silver',
    icon: 'design',
    flag: '🇫🇷',
    desc: "Application web sociale pour digitaliser son dressing. Suggestions automatiques d'outfits, gamification sociale avec classement hebdomadaire. MVP pensé pour une expérience de sélection à publication en moins de 2 minutes.",
    tags: ['UX/UI','Figma','React','Product Design','MVP'],
    stats:    [{ v:85,l:'UX' },{ v:83,l:'UI' },{ v:80,l:'WIR' },{ v:78,l:'PRO' },{ v:82,l:'MVP' },{ v:84,l:'RES' }],
    detStats: [{ v:85,l:'UX Research' },{ v:83,l:'UI Design' },{ v:80,l:'Wireframes' },{ v:78,l:'Prototype Figma' },{ v:82,l:'MVP Scope' },{ v:84,l:'User Testing' }],
    pitch: { left:'15%', top:'42%' },
    pitchLabel: 'LM',
    github: 'https://github.com/idriss678',
  },
  syf: {
    id: 'syf',
    name: 'Save Your Friends',
    type: 'IA / NLP',
    rating: 91,
    pos: 'ST',
    cardClass: 'special',
    icon: 'shield',
    flag: '🇫🇷',
    desc: "Bot anti-harcèlement Python avec architecture hybride (Regex, Detoxify, ML) et LLM local Mistral pour aide confidentielle. 80% de modération automatique. Système modulaire garantissant la protection totale des données.",
    tags: ['Python','ML','NLP','Mistral LLM','Discord API'],
    stats:    [{ v:92,l:'PY' },{ v:90,l:'ML' },{ v:88,l:'NLP' },{ v:91,l:'MOD' },{ v:85,l:'SEC' },{ v:86,l:'API' }],
    detStats: [{ v:92,l:'Python' },{ v:90,l:'Machine Learning' },{ v:88,l:'Traitement NLP' },{ v:91,l:'Modération' },{ v:85,l:'Sécurité données' },{ v:86,l:'API REST' }],
    pitch: { left:'50%', top:'18%' },
    pitchLabel: 'ST',
    github: 'https://github.com/idriss678',
  },
  nb: {
    id: 'nb',
    name: 'NextBuy',
    type: 'Data / ML',
    rating: 87,
    pos: 'CAM',
    cardClass: 'gold',
    icon: 'chart',
    flag: '🇫🇷',
    desc: "Solution d'intelligence décisionnelle pour plateforme de livraison. ML pour prédire fidélité client et volume commandes. Dashboard interactif Streamlit pour prise de décision stratégique en temps réel.",
    tags: ['Python','ML','Streamlit','SQL','Data Cleaning'],
    stats:    [{ v:88,l:'PY' },{ v:85,l:'SQL' },{ v:82,l:'ML' },{ v:90,l:'VIZ' },{ v:87,l:'CLN' },{ v:80,l:'LOG' }],
    detStats: [{ v:88,l:'Python' },{ v:85,l:'SQL' },{ v:82,l:'Machine Learning' },{ v:90,l:'Visualisation' },{ v:87,l:'Data Cleaning' },{ v:80,l:'Logistique' }],
    pitch: { left:'38%', top:'30%' },
    pitchLabel: 'CAM',
    github: 'https://github.com/idriss678',
  },
  hj: {
    id: 'hj',
    name: 'Hack & Juice',
    type: 'Cybersécurité',
    rating: 85,
    pos: 'RB',
    cardClass: 'red-special',
    icon: 'lock',
    flag: '🇫🇷',
    desc: "Étude technique approfondie sur application web pour détecter failles de sécurité. Simulation d'attaques OWASP, évaluation résistance système, propositions de solutions concrètes contre les intrusions.",
    tags: ['Pentest','OWASP','Burp Suite','Cybersécurité','Web'],
    stats:    [{ v:89,l:'PEN' },{ v:88,l:'OWA' },{ v:85,l:'BRP' },{ v:83,l:'ANL' },{ v:80,l:'RAP' },{ v:82,l:'EXP' }],
    detStats: [{ v:89,l:'Pentest' },{ v:88,l:'OWASP' },{ v:85,l:'Burp Suite' },{ v:83,l:'Analyse' },{ v:80,l:'Rapport' },{ v:82,l:'Exploitation' }],
    pitch: { left:'85%', top:'68%' },
    pitchLabel: 'RB',
    github: 'https://github.com/idriss678',
  },
  cvrie: {
    id: 'cvrie',
    name: 'CVRIE',
    type: 'IA Médicale',
    rating: 86,
    pos: 'CAM',
    cardClass: 'gold',
    icon: 'chart',
    flag: '🇫🇷',
    desc: "IA médicale développée à Epitech : classification d'images médicales (scanners, IRM, radios) par apprentissage supervisé, et regroupement de témoignages de patients par pathologie via clustering non supervisé. Prétraitement des données, choix de fonctions de perte et comparaison de modèles documentés en notebooks.",
    tags: ['Python','Scikit-learn','Pandas','Clustering','Classification Médicale'],
    stats:    [{ v:87,l:'PY' },{ v:84,l:'ML' },{ v:82,l:'CV' },{ v:80,l:'CLU' },{ v:83,l:'DATA' },{ v:85,l:'ANL' }],
    detStats: [{ v:87,l:'Python' },{ v:84,l:'Machine Learning' },{ v:82,l:'Vision par ordinateur' },{ v:80,l:'Clustering' },{ v:83,l:'Prétraitement données' },{ v:85,l:'Analyse / Notebooks' }],
    pitch: { left:'38%', top:'30%' },
    pitchLabel: 'CAM',
    github: 'https://github.com/idriss678',
  },
};

// ── Carte pro finale (récompense SBC) ──────────
export const idriss_pro = {
  name: 'Idriss A.',
  pos: 'DEV',
  rating: 83,
  cardClass: 'gold',
  icon: 'person',
  flag: '🇫🇷',
  stats: [
    { v:88,l:'PY' },{ v:85,l:'SEC' },{ v:82,l:'ML' },
    { v:80,l:'SQL' },{ v:75,l:'JS' },{ v:92,l:'ADP' },
  ],
};

// ── Carte bronze (pack) ────────────────────────
export const idriss_bronze = {
  name: 'Idriss A.',
  pos: 'DEV',
  rating: 62,
  cardClass: 'bronze',
  icon: 'person',
  flag: '🇫🇷',
  stats: [
    { v:60,l:'PY' },{ v:55,l:'SEC' },{ v:58,l:'ML' },
    { v:52,l:'SQL' },{ v:50,l:'JS' },{ v:70,l:'ADP' },
  ],
};

// ── Ordre d'ouverture du pack ──────────────────
export const REVEAL_ORDER = ['piscine','tardis','alice','dripday','syf','nb','hj'];

// ── Slots de la formation 4-3-2-1 ─────────────
export const pitchSlots = [
  { left:'50%', top:'92%', label:'GK',  proj:'piscine' },
  { left:'20%', top:'68%', label:'LB',  proj: null     },
  { left:'38%', top:'68%', label:'CB',  proj:'tardis'  },
  { left:'62%', top:'68%', label:'CB',  proj: null     },
  { left:'80%', top:'68%', label:'RB',  proj:'hj'      },
  { left:'15%', top:'42%', label:'LM',  proj:'dripday' },
  { left:'38%', top:'42%', label:'CM',  proj:'alice'   },
  { left:'62%', top:'42%', label:'CM',  proj:'nb'      },
  { left:'85%', top:'42%', label:'RM',  proj: null     },
  { left:'38%', top:'30%', label:'CAM', proj:'cvrie'   },
  { left:'50%', top:'18%', label:'ST',  proj:'syf'     },
];

// ── Évolutions futures ─────────────────────────
export const evolutions = [
  {
    name: 'Réseau de Neurones', type: 'Deep Learning', locked: true,
    req: 'Compléter un cours Pytorch ou TensorFlow',
    boost: [{ s:'ML', v:'+8' },{ s:'PY', v:'+5' }], when: 'Prochain semestre',
  },
  {
    name: 'Cloud Dev', type: 'DevOps / Cloud', locked: true,
    req: 'Déployer une app sur AWS ou GCP',
    boost: [{ s:'OPS', v:'+10' },{ s:'DEV', v:'+6' }], when: 'Stage été 2026',
  },
  {
    name: 'Full-Stack', type: 'React + Node', locked: true,
    req: 'Finaliser le projet Product Design DRIPDAY',
    boost: [{ s:'JS', v:'+12' },{ s:'UI', v:'+8' }], when: 'En cours...',
  },
  {
    name: 'Red Team', type: 'Pentest Avancé', locked: true,
    req: 'Certification CEH ou HTB Pro Labs',
    boost: [{ s:'SEC', v:'+15' },{ s:'PEN', v:'+12' }], when: 'Futur proche',
  },
  {
    name: 'LLM Engineer', type: 'IA Générative', locked: true,
    req: 'Projet avec fine-tuning ou RAG complet',
    boost: [{ s:'LLM', v:'+18' },{ s:'NLP', v:'+10' }], when: 'Année 2',
  },
  {
    name: 'Data Engineer', type: 'Big Data', locked: true,
    req: 'Pipeline ETL avec Spark ou Airflow',
    boost: [{ s:'DATA', v:'+14' },{ s:'SQL', v:'+8' }], when: 'Année 2',
  },
];