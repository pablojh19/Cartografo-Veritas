import { useState, useEffect, useRef } from "react";

const LANG = {
  es: {
    tagline: "Mapeando la verdad del mundo",
    subtitle: "Geopolítica · Filosofía · Historia · Literatura · Poder · Cine",
    explore: "Explorar",
    readMore: "Leer más",
    latestArticles: "Últimos artículos",
    allSections: "Todas las secciones",
    aiAssistant: "Asistente IA",
    write: "Escribir",
    back: "Volver",
    aiTitle: "Asistente Cartógrafo",
    aiSubtitle: "Tu guía intelectual",
    send: "Enviar",
    clearChat: "Limpiar conversación",
    startPrompt: "Escribe para comenzar...",
    newArticle: "Nuevo artículo",
    title: "Título",
    category: "Categoría",
    tags: "Tags",
    content: "Contenido",
    publish: "Publicar",
    aiHelp: "Ayuda con IA",
    readTime: "min de lectura",
    articles: "artículos",
    library: "Biblioteca",
    librarySubtitle: "311 libros · Una vida de lecturas",
    searchBooks: "Buscar en la biblioteca...",
    allGenres: "Todo",
  },
  en: {
    tagline: "Mapping the truth of the world",
    subtitle: "Geopolitics · Philosophy · History · Literature · Power · Film",
    explore: "Explore",
    readMore: "Read more",
    latestArticles: "Latest articles",
    allSections: "All sections",
    aiAssistant: "AI Assistant",
    write: "Write",
    back: "Back",
    aiTitle: "Cartographer Assistant",
    aiSubtitle: "Your intellectual guide",
    send: "Send",
    clearChat: "Clear chat",
    startPrompt: "Write to begin...",
    newArticle: "New article",
    title: "Title",
    category: "Category",
    tags: "Tags",
    content: "Content",
    publish: "Publish",
    aiHelp: "AI Help",
    readTime: "min read",
    articles: "articles",
    library: "Library",
    librarySubtitle: "311 books · A life of reading",
    searchBooks: "Search library...",
    allGenres: "All",
  }
};

const CATEGORIES = [
  {
    id: "poder",
    es: "Poder Global",
    en: "Global Power",
    icon: "◈",
    color: "#C8102E",
    bgColor: "rgba(200,16,46,0.08)",
    es_sub: "BlackRock · Palantir · Élites · Control del mundo",
    en_sub: "BlackRock · Palantir · Elites · Who controls the world",
    articles: [
      {
        id: 1,
        es_title: "BlackRock: El dueño invisible del mundo",
        en_title: "BlackRock: The invisible owner of the world",
        es_excerpt: "Con 10 billones de dólares bajo administración, BlackRock es el mayor accionista de casi todas las empresas del S&P 500. Larry Fink no gobierna países — algo más poderoso: gobierna corporaciones.",
        en_excerpt: "With $10 trillion under management, BlackRock is the largest shareholder of nearly every S&P 500 company. Larry Fink doesn't govern countries — something more powerful: he governs corporations.",
        date: "Mayo 2025", en_date: "May 2025", readTime: "12"
      },
      {
        id: 2,
        es_title: "Palantir y la arquitectura del control",
        en_title: "Palantir and the architecture of control",
        es_excerpt: "Alex Karp y Peter Thiel construyeron la empresa de inteligencia artificial más poderosa del mundo. Sus clientes: la CIA, el Pentágono, y cada vez más, gobiernos de todo el planeta.",
        en_excerpt: "Alex Karp and Peter Thiel built the most powerful AI intelligence company in the world. Their clients: the CIA, the Pentagon, and increasingly, governments across the globe.",
        date: "Abril 2025", en_date: "April 2025", readTime: "15"
      },
      {
        id: 3,
        es_title: "Elon Musk, Starlink y la guerra de Ucrania",
        en_title: "Elon Musk, Starlink and the Ukraine war",
        es_excerpt: "Cuando un solo hombre puede cortar las comunicaciones de un ejército, la línea entre empresa privada y poder estatal se borra para siempre. El caso más extraño de la geopolítica moderna.",
        en_excerpt: "When a single man can cut an army's communications, the line between private enterprise and state power is forever erased. The strangest case in modern geopolitics.",
        date: "Marzo 2025", en_date: "March 2025", readTime: "14"
      }
    ]
  },
  {
    id: "filosofia",
    es: "Filosofía",
    en: "Philosophy",
    icon: "Ψ",
    color: "#8B7355",
    bgColor: "rgba(139,115,85,0.08)",
    es_sub: "Grecia · Nietzsche · Existencialismo · Schopenhauer",
    en_sub: "Greece · Nietzsche · Existentialism · Schopenhauer",
    articles: [
      {
        id: 4,
        es_title: "Nietzsche y el eterno retorno: La carga más pesada",
        en_title: "Nietzsche and the eternal return: The heaviest burden",
        es_excerpt: "Si tuvieras que vivir tu vida exactamente igual, infinitas veces — ¿qué cambiarías? El experimento mental más perturbador de la filosofía occidental.",
        en_excerpt: "If you had to live your life exactly the same, infinite times — what would you change? The most disturbing thought experiment in Western philosophy.",
        date: "Mayo 2025", en_date: "May 2025", readTime: "15"
      },
      {
        id: 5,
        es_title: "La caverna de Platón en el siglo XXI",
        en_title: "Plato's cave in the 21st century",
        es_excerpt: "Las redes sociales, el algoritmo, la cámara de eco — Platón describió todo esto 2400 años antes de que existiera. La alegoría más vigente de la historia.",
        en_excerpt: "Social media, the algorithm, the echo chamber — Plato described all this 2,400 years before it existed. The most relevant allegory in history.",
        date: "Abril 2025", en_date: "April 2025", readTime: "11"
      }
    ]
  },
  {
    id: "historia",
    es: "Historia",
    en: "History",
    icon: "⚔",
    color: "#8B4513",
    bgColor: "rgba(139,69,19,0.08)",
    es_sub: "Imperios · Guerras · Revoluciones · Civilizaciones",
    en_sub: "Empires · Wars · Revolutions · Civilizations",
    articles: [
      {
        id: 6,
        es_title: "El Imperio Ruso: De los Romanov al colapso soviético",
        en_title: "The Russian Empire: From the Romanovs to the Soviet collapse",
        es_excerpt: "Tres siglos de expansión imperial, autocracia y contradicción interna. La historia de un gigante que se destruyó a sí mismo dos veces en el mismo siglo.",
        en_excerpt: "Three centuries of imperial expansion, autocracy and internal contradiction. The story of a giant that destroyed itself twice in the same century.",
        date: "Mayo 2025", en_date: "May 2025", readTime: "18"
      },
      {
        id: 7,
        es_title: "La Segunda Guerra Mundial como colapso civilizatorio",
        en_title: "World War II as civilizational collapse",
        es_excerpt: "Más allá de batallas y fechas: cómo Versalles, el resentimiento y la economía destruida crearon las condiciones para el mayor crimen de la historia.",
        en_excerpt: "Beyond battles and dates: how Versailles, resentment and a broken economy created the conditions for the greatest crime in history.",
        date: "Abril 2025", en_date: "April 2025", readTime: "20"
      }
    ]
  },
  {
    id: "literatura",
    es: "Literatura",
    en: "Literature",
    icon: "✦",
    color: "#2C5F8A",
    bgColor: "rgba(44,95,138,0.08)",
    es_sub: "Dostoevsky · Tolstoy · Kafka · Camus · Clásicos",
    en_sub: "Dostoevsky · Tolstoy · Kafka · Camus · Classics",
    articles: [
      {
        id: 8,
        es_title: "Dostoevsky: El alma humana en su forma más brutal",
        en_title: "Dostoevsky: The human soul in its most brutal form",
        es_excerpt: "Crimen y Castigo no es una novela policiaca. Es un tratado sobre el orgullo intelectual, la culpa y la posibilidad de la redención. Raskolnikov somos todos.",
        en_excerpt: "Crime and Punishment is not a detective novel. It is a treatise on intellectual pride, guilt and the possibility of redemption. We are all Raskolnikov.",
        date: "Mayo 2025", en_date: "May 2025", readTime: "20"
      },
      {
        id: 9,
        es_title: "Kafka y la burocracia como pesadilla existencial",
        en_title: "Kafka and bureaucracy as existential nightmare",
        es_excerpt: "La metamorfosis no es sobre convertirse en insecto. Es sobre el momento en que el sistema te hace sentir que ya dejaste de ser humano.",
        en_excerpt: "The Metamorphosis is not about becoming an insect. It is about the moment the system makes you feel you have ceased to be human.",
        date: "Abril 2025", en_date: "April 2025", readTime: "12"
      }
    ]
  },
  {
    id: "geopolitica",
    es: "Geopolítica",
    en: "Geopolitics",
    icon: "◉",
    color: "#1a6e4a",
    bgColor: "rgba(26,110,74,0.08)",
    es_sub: "México · EE.UU. · China · Nuevo orden mundial",
    en_sub: "Mexico · USA · China · New world order",
    articles: [
      {
        id: 10,
        es_title: "México en la encrucijada: Populismo, crimen y el Estado",
        en_title: "Mexico at the crossroads: Populism, crime and the State",
        es_excerpt: "El legado de la Cuarta Transformación y los desafíos que enfrenta un país donde el crimen organizado compite directamente con las instituciones del Estado.",
        en_excerpt: "The legacy of the Fourth Transformation and the challenges facing a country where organized crime directly competes with state institutions.",
        date: "Mayo 2025", en_date: "May 2025", readTime: "14"
      },
      {
        id: 11,
        es_title: "Xi Jinping y Musk: El eje que nadie discute",
        en_title: "Xi Jinping and Musk: The axis nobody discusses",
        es_excerpt: "Tesla en China, Starlink en Ucrania, TikTok en Occidente. Las relaciones entre el hombre más rico del mundo y el líder del partido comunista más poderoso.",
        en_excerpt: "Tesla in China, Starlink in Ukraine, TikTok in the West. The relationship between the world's richest man and the leader of the most powerful communist party.",
        date: "Abril 2025", en_date: "April 2025", readTime: "16"
      }
    ]
  },
  {
    id: "cine",
    es: "Cine",
    en: "Film",
    icon: "▶",
    color: "#6B35A8",
    bgColor: "rgba(107,53,168,0.08)",
    es_sub: "Simbolismo · Cine de autor · Análisis profundo",
    en_sub: "Symbolism · Auteur cinema · Deep analysis",
    articles: [
      {
        id: 12,
        es_title: "2001: Odisea en el Espacio — El monolito como espejo",
        en_title: "2001: A Space Odyssey — The monolith as mirror",
        es_excerpt: "Kubrick no hizo ciencia ficción. Hizo una meditación sobre la evolución, el control tecnológico y la trascendencia. HAL 9000 es la IA que ya tenemos.",
        en_excerpt: "Kubrick didn't make science fiction. He made a meditation on evolution, technological control and transcendence. HAL 9000 is the AI we already have.",
        date: "Mayo 2025", en_date: "May 2025", readTime: "16"
      }
    ]
  }
];

const BOOKS = [
  { id: 1, title: "Crime and Punishment", author: "Fyodor Dostoevsky", genre: "Literature", status: "read" },
  { id: 2, title: "Beyond Good and Evil", author: "Nietzsche", genre: "Philosophy", status: "read" },
  { id: 3, title: "War and Peace", author: "Leo Tolstoy", genre: "Literature", status: "read" },
  { id: 4, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", genre: "Literature", status: "read" },
  { id: 5, title: "World Order", author: "Henry Kissinger", genre: "Geopolitics", status: "read" },
  { id: 6, title: "The Origins of Totalitarianism", author: "Hannah Arendt", genre: "Politics", status: "read" },
  { id: 7, title: "The Republic", author: "Plato", genre: "Philosophy", status: "read" },
  { id: 8, title: "Meditations", author: "Marcus Aurelius", genre: "Philosophy", status: "read" },
  { id: 9, title: "Dune", author: "Frank Herbert", genre: "Fiction", status: "read" },
  { id: 10, title: "The Metamorphosis", author: "Franz Kafka", genre: "Literature", status: "read" },
  { id: 11, title: "Thus Spoke Zarathustra", author: "Nietzsche", genre: "Philosophy", status: "read" },
  { id: 12, title: "Guns, Germs and Steel", author: "Jared Diamond", genre: "History", status: "read" },
  { id: 13, title: "Capital in the 21st Century", author: "Thomas Piketty", genre: "Economics", status: "read" },
  { id: 14, title: "The Rise and Fall of the Third Reich", author: "William Shirer", genre: "History", status: "read" },
  { id: 15, title: "1984", author: "George Orwell", genre: "Fiction", status: "read" },
  { id: 16, title: "Man's Search for Meaning", author: "Viktor Frankl", genre: "Philosophy", status: "read" },
  { id: 17, title: "The Stranger", author: "Albert Camus", genre: "Literature", status: "read" },
  { id: 18, title: "Nausea", author: "Jean-Paul Sartre", genre: "Literature", status: "read" },
  { id: 19, title: "Being and Time", author: "Martin Heidegger", genre: "Philosophy", status: "read" },
  { id: 20, title: "Napoleon: A Life", author: "Andrew Roberts", genre: "History", status: "read" },
];

const GENRE_COLORS = {
  Literature: "#2C5F8A",
  Philosophy: "#8B7355",
  History: "#8B4513",
  Geopolitics: "#1a6e4a",
  Politics: "#C8102E",
  Economics: "#2d6a4f",
  Fiction: "#6B35A8",
};

const AI_MODES_DATA = {
  es: [
    { id: "research", icon: "◈", label: "Investigar", system: `Eres el Asistente Cartógrafo para "Cartógrafo Veritas", un blog intelectual sobre geopolítica, filosofía, historia, poder global y literatura. Cuando te den un tema, provee: 1) Conceptos clave, 2) Contexto histórico, 3) Figuras principales, 4) Debates actuales, 5) Relevancia hoy. Sé exhaustivo, riguroso, como un profesor de élite. Responde en español.` },
    { id: "ideas", icon: "✦", label: "Ideas", system: `Eres estratega de contenido para "Cartógrafo Veritas". Genera 5 ideas de artículos específicos y provocadores sobre: poder corporativo (BlackRock, Palantir, élites), geopolítica, filosofía (Nietzsche, Dostoevsky, griegos), historia, literatura. Sé muy específico e intelectualmente desafiante. Responde en español.` },
    { id: "discuss", icon: "Ψ", label: "Debatir", system: `Eres un interlocutor intelectual para "Cartógrafo Veritas". Debate ideas con rigor socrático: desafía suposiciones, trae perspectivas filosóficas e históricas, haz preguntas penetrantes. Piensa como Hitchens + Sócrates + Kissinger. Responde en español.` },
    { id: "write", icon: "▶", label: "Escribir", system: `Eres el co-escritor de "Cartógrafo Veritas". Ayuda a desarrollar artículos con: argumentos sólidos, referencias a pensadores relevantes, estructura narrativa poderosa. Sé colaborador y exigente. Responde en español.` },
  ],
  en: [
    { id: "research", icon: "◈", label: "Research", system: `You are the Cartographer Assistant for "Cartógrafo Veritas", an intellectual blog on geopolitics, philosophy, history, global power and literature. When given a topic, provide: 1) Key concepts, 2) Historical context, 3) Main figures, 4) Current debates, 5) Relevance today. Be exhaustive, rigorous, like an elite professor. Respond in English.` },
    { id: "ideas", icon: "✦", label: "Ideas", system: `You are content strategist for "Cartógrafo Veritas". Generate 5 specific and provocative article ideas about: corporate power (BlackRock, Palantir, elites), geopolitics, philosophy (Nietzsche, Dostoevsky, Greeks), history, literature. Be very specific and intellectually challenging. Respond in English.` },
    { id: "discuss", icon: "Ψ", label: "Debate", system: `You are an intellectual sparring partner for "Cartógrafo Veritas". Debate ideas with Socratic rigor: challenge assumptions, bring philosophical and historical perspectives, ask penetrating questions. Think like Hitchens + Socrates + Kissinger. Respond in English.` },
    { id: "write", icon: "▶", label: "Write", system: `You are the co-writer of "Cartógrafo Veritas". Help develop articles with: solid arguments, references to relevant thinkers, powerful narrative structure. Be collaborative and demanding. Respond in English.` },
  ]
};

export default function CartografoVeritas() {
  const [lang, setLang] = useState<"es"|"en">("es");
  const [view, setView] = useState<string>("home");
  const [activeCategory, setActiveCategory] = useState<any>(null);
  const [activeArticle, setActiveArticle] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiMode, setAiMode] = useState(0);
  const [aiMessages, setAiMessages] = useState<{role:string,content:string}[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [bookSearch, setBookSearch] = useState("");
  const [bookGenre, setBookGenre] = useState("All");
  const [newArt, setNewArt] = useState({ title: "", content: "", category: "", tags: "" });
  const [articles, setArticles] = useState<Record<string, any[]>>(() => {
    const a: Record<string, any[]> = {};
    CATEGORIES.forEach(c => { a[c.id] = c.articles; });
    return a;
  });
  const messagesEnd = useRef<HTMLDivElement>(null);
  const t = LANG[lang];
  const aiModes = AI_MODES_DATA[lang];

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [aiMessages]);

  const sendAi = async (text?: string) => {
    const msg = text || aiInput.trim();
    if (!msg) return;
    const newMsgs = [...aiMessages, { role: "user", content: msg }];
    setAiMessages(newMsgs);
    setAiInput("");
    setAiLoading(true);
    try {
     const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMsgs, systemPrompt: aiModes[aiMode].system })
        });
      const data = await res.json();
      const reply = data.text || "Error.";
      setAiMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setAiMessages([...newMsgs, { role: "assistant", content: "Error de conexión." }]);
    }
    setAiLoading(false);
  };

  const allArticles = Object.values(articles).flat();
  const genres = ["All", ...Array.from(new Set(BOOKS.map(b => b.genre)))];
  const filteredBooks = BOOKS.filter(b =>
    (bookGenre === "All" || b.genre === bookGenre) &&
    (b.title.toLowerCase().includes(bookSearch.toLowerCase()) || b.author.toLowerCase().includes(bookSearch.toLowerCase()))
  );

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#E8E4DC", fontFamily: "'Georgia', serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cv-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .cv-body { font-family: 'Libre Baskerville', Georgia, serif; }
        .cv-mono { font-family: 'Space Mono', monospace; }

        .cv-nav-link {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          color: #666;
          background: none;
          border: none;
          padding: 4px 0;
          transition: color 0.2s;
          text-decoration: none;
        }
        .cv-nav-link:hover { color: #C8102E; }
        .cv-nav-link.active { color: #C8B060; }

        .cv-card {
          cursor: pointer;
          border: 1px solid #1a1a1a;
          background: #0d0d0d;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .cv-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: #C8102E;
          transition: width 0.4s;
        }
        .cv-card:hover { border-color: #2a2a2a; transform: translateY(-2px); }
        .cv-card:hover::before { width: 100%; }

        .cv-art-card {
          cursor: pointer;
          padding: 28px 0;
          border-bottom: 1px solid #141414;
          transition: all 0.2s;
        }
        .cv-art-card:hover .cv-art-title { color: #C8B060; }

        .cv-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 8px;
          border: 1px solid currentColor;
          opacity: 0.7;
        }

        .cv-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 8px 18px;
          cursor: pointer;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #888;
          transition: all 0.2s;
        }
        .cv-btn:hover { border-color: #C8102E; color: #E8E4DC; }
        .cv-btn.active { border-color: #C8B060; color: #C8B060; background: rgba(200,176,96,0.05); }

        .cv-primary-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 12px 28px;
          cursor: pointer;
          border: 1px solid #C8102E;
          background: transparent;
          color: #C8102E;
          transition: all 0.3s;
        }
        .cv-primary-btn:hover { background: #C8102E; color: #fff; }

        .cv-input {
          font-family: 'Libre Baskerville', Georgia, serif;
          font-size: 1rem;
          padding: 10px 14px;
          border: 1px solid #1a1a1a;
          background: #0d0d0d;
          color: #E8E4DC;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }
        .cv-input:focus { border-color: #C8B060; }

        .cv-textarea {
          font-family: 'Libre Baskerville', Georgia, serif;
          font-size: 1rem;
          line-height: 1.8;
          padding: 14px;
          border: 1px solid #1a1a1a;
          background: #0d0d0d;
          color: #E8E4DC;
          outline: none;
          width: 100%;
          resize: vertical;
          min-height: 280px;
          transition: border-color 0.2s;
        }
        .cv-textarea:focus { border-color: #C8B060; }

        .cv-select {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          padding: 10px 14px;
          border: 1px solid #1a1a1a;
          background: #0d0d0d;
          color: #E8E4DC;
          outline: none;
          width: 100%;
          cursor: pointer;
        }

        .cv-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4,4,4,0.98);
          z-index: 200;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }
        .cv-menu-item {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem;
          font-style: italic;
          color: #333;
          cursor: pointer;
          border: none;
          background: none;
          transition: color 0.3s;
          letter-spacing: 0.02em;
        }
        .cv-menu-item:hover { color: #E8E4DC; }

        .cv-section-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C8102E;
          margin-bottom: 16px;
        }

        .cv-gold { color: #C8B060; }
        .cv-red { color: #C8102E; }
        .cv-dim { color: #444; }

        .cv-divider {
          border: none;
          border-top: 1px solid #141414;
          margin: 40px 0;
        }

        .cv-book-card {
          padding: 16px;
          border: 1px solid #141414;
          background: #0a0a0a;
          transition: all 0.2s;
        }
        .cv-book-card:hover { border-color: #2a2a2a; }

        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .grid-2 { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
        .grid-books { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr; }
          .grid-2 { grid-template-columns: 1fr; }
          .grid-books { grid-template-columns: repeat(2, 1fr); }
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; }

        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .cv-hero-line {
          position: absolute;
          left: 0; top: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #C8102E, transparent);
        }
      `}</style>

      {/* MENU OVERLAY */}
      {menuOpen && (
        <div className="cv-menu-overlay">
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, #C8102E, transparent)" }} />
          <button className="cv-menu-item" onClick={() => { setView("home"); setMenuOpen(false); }}>
            {lang === "es" ? "Inicio" : "Home"}
          </button>
          {CATEGORIES.map(c => (
            <button key={c.id} className="cv-menu-item" onClick={() => { setActiveCategory(c); setView("category"); setMenuOpen(false); }}>
              {c[lang]}
            </button>
          ))}
          <button className="cv-menu-item" onClick={() => { setView("library"); setMenuOpen(false); }}>
            {t.library}
          </button>
          <button className="cv-menu-item" onClick={() => { setView("ai"); setMenuOpen(false); }}>
            {t.aiAssistant}
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: "absolute", top: 32, right: 40, background: "none", border: "none", color: "#333", fontSize: "1.5rem", cursor: "pointer", fontFamily: "Space Mono, monospace" }}
          >✕</button>
          <div style={{ position: "absolute", bottom: 32, display: "flex", gap: 16 }}>
            <button className="cv-btn" style={{ color: lang === "es" ? "#C8B060" : "#444", borderColor: lang === "es" ? "#C8B060" : "#1a1a1a" }} onClick={() => setLang("es")}>ES</button>
            <button className="cv-btn" style={{ color: lang === "en" ? "#C8B060" : "#444", borderColor: lang === "en" ? "#C8B060" : "#1a1a1a" }} onClick={() => setLang("en")}>EN</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header style={{ borderBottom: "1px solid #111", padding: "0 48px", background: "#080808", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: i === 1 ? 20 : 28, height: 1, background: "#444", transition: "all 0.2s" }} />)}
          </button>

          <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "center" }}>
            <div className="cv-display" style={{ fontSize: "1.6rem", fontWeight: 300, letterSpacing: "0.15em", color: "#E8E4DC", fontStyle: "italic" }}>
              Cartógrafo <span className="cv-gold">Veritas</span>
            </div>
          </button>

          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <button className="cv-nav-link" onClick={() => setView("ai")}>{t.aiAssistant}</button>
            <button className="cv-nav-link" onClick={() => setView("write")}>{t.write}</button>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={`cv-btn ${lang === "es" ? "active" : ""}`} style={{ padding: "4px 10px", fontSize: "0.55rem" }} onClick={() => setLang("es")}>ES</button>
              <button className={`cv-btn ${lang === "en" ? "active" : ""}`} style={{ padding: "4px 10px", fontSize: "0.55rem" }} onClick={() => setLang("en")}>EN</button>
            </div>
          </div>
        </div>

        {/* Category nav */}
        <div style={{ display: "flex", gap: 32, paddingBottom: 14, paddingTop: 14, borderTop: "1px solid #0f0f0f", overflowX: "auto" }}>
          {CATEGORIES.map(c => (
            <button key={c.id} className={`cv-nav-link ${activeCategory?.id === c.id && view === "category" ? "active" : ""}`}
              onClick={() => { setActiveCategory(c); setView("category"); }}
              style={{ whiteSpace: "nowrap", color: activeCategory?.id === c.id && view === "category" ? c.color : "" }}>
              <span style={{ marginRight: 6, opacity: 0.5 }}>{c.icon}</span>{c[lang]}
            </button>
          ))}
          <button className={`cv-nav-link ${view === "library" ? "active" : ""}`} onClick={() => setView("library")} style={{ whiteSpace: "nowrap" }}>
            <span style={{ marginRight: 6, opacity: 0.5 }}>◫</span>{t.library}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 24px" }} className="fade-in">

        {/* ══════════════════ HOME ══════════════════ */}
        {view === "home" && (
          <div>
            {/* Hero */}
            <div style={{ position: "relative", borderBottom: "1px solid #111", paddingBottom: 64, marginBottom: 64 }}>
              <div className="cv-hero-line" />
              <div style={{ paddingLeft: 32 }}>
                <div className="cv-section-label" style={{ marginBottom: 20 }}>— Cartógrafo Veritas</div>
                <h1 className="cv-display" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.01em", fontStyle: "italic", marginBottom: 24 }}>
                  {lang === "es" ? (
                    <>Mapeando la<br /><span className="cv-gold">verdad</span><br />del mundo</>
                  ) : (
                    <>Mapping the<br /><span className="cv-gold">truth</span><br />of the world</>
                  )}
                </h1>
                <p className="cv-body" style={{ color: "#555", fontSize: "1rem", lineHeight: 1.8, maxWidth: 520 }}>
                  {t.subtitle}
                </p>
              </div>
            </div>

            {/* Featured articles */}
            {allArticles.length > 0 && (
              <>
                <div className="cv-section-label">— {t.latestArticles}</div>
                <div className="grid-2" style={{ marginBottom: 64 }}>
                  {(() => {
                    const a = allArticles[0];
                    const cat = CATEGORIES.find(c => c.articles.some(x => x.id === a.id));
                    return (
                      <div className="cv-art-card" style={{ borderRight: "1px solid #111", paddingRight: 40, borderBottom: "none" }}
                        onClick={() => { setActiveArticle({ ...a, cat }); setView("article"); }}>
                        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                          <span className="cv-tag" style={{ color: cat?.color }}>{cat?.[lang]}</span>
                        </div>
                        <h2 className="cv-art-title cv-display" style={{ fontSize: "2.2rem", lineHeight: 1.2, marginBottom: 20, fontWeight: 400, fontStyle: "italic" }}>
                          {lang === "es" ? a.es_title : a.en_title}
                        </h2>
                        <p className="cv-body" style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.9 }}>
                          {lang === "es" ? a.es_excerpt : a.en_excerpt}
                        </p>
                        <div className="cv-mono" style={{ marginTop: 24, fontSize: "0.55rem", color: "#333", letterSpacing: "0.12em" }}>
                          {lang === "es" ? a.date : a.en_date} · {a.readTime} {t.readTime}
                        </div>
                      </div>
                    );
                  })()}
                  <div>
                    {allArticles.slice(1, 4).map(a => {
                      const cat = CATEGORIES.find(c => c.articles.some(x => x.id === a.id));
                      return (
                        <div key={a.id} className="cv-art-card" onClick={() => { setActiveArticle({ ...a, cat }); setView("article"); }}>
                          <span className="cv-tag" style={{ color: cat?.color, marginBottom: 10, display: "inline-block" }}>{cat?.[lang]}</span>
                          <h3 className="cv-art-title cv-display" style={{ fontSize: "1.2rem", lineHeight: 1.35, marginBottom: 8, fontStyle: "italic", marginTop: 8 }}>
                            {lang === "es" ? a.es_title : a.en_title}
                          </h3>
                          <div className="cv-mono" style={{ fontSize: "0.55rem", color: "#333", letterSpacing: "0.1em" }}>
                            {lang === "es" ? a.date : a.en_date} · {a.readTime} {t.readTime}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <hr className="cv-divider" />

            {/* Sections grid */}
            <div className="cv-section-label">— {t.allSections}</div>
            <div className="grid-3" style={{ marginBottom: 64 }}>
              {CATEGORIES.map(c => (
                <div key={c.id} className="cv-card" style={{ padding: 28 }}
                  onClick={() => { setActiveCategory(c); setView("category"); }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 16, color: c.color, opacity: 0.8 }}>{c.icon}</div>
                  <h3 className="cv-display" style={{ fontSize: "1.4rem", fontStyle: "italic", marginBottom: 8, fontWeight: 400 }}>{c[lang]}</h3>
                  <p className="cv-mono" style={{ fontSize: "0.55rem", color: "#333", letterSpacing: "0.08em", lineHeight: 1.7 }}>
                    {c[`${lang}_sub`]}
                  </p>
                  <div className="cv-mono" style={{ marginTop: 20, fontSize: "0.55rem", color: "#2a2a2a" }}>
                    {(articles[c.id] || []).length} {t.articles} →
                  </div>
                </div>
              ))}
            </div>

            {/* AI Banner */}
            <div style={{ border: "1px solid #141414", padding: "48px", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, #C8102E 40%, transparent)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
                <div>
                  <div className="cv-section-label">— {t.aiAssistant}</div>
                  <h3 className="cv-display" style={{ fontSize: "2rem", fontStyle: "italic", color: "#E8E4DC", fontWeight: 300 }}>
                    {lang === "es" ? "Tu compañero intelectual" : "Your intellectual companion"}
                  </h3>
                  <p className="cv-body" style={{ color: "#444", marginTop: 8, fontSize: "0.9rem" }}>
                    {lang === "es" ? "Investigación profunda · Ideas · Debate · Co-escritura" : "Deep research · Ideas · Debate · Co-writing"}
                  </p>
                </div>
                <button className="cv-primary-btn" onClick={() => setView("ai")}>
                  {lang === "es" ? "Abrir asistente →" : "Open assistant →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════ CATEGORY ══════════════════ */}
        {view === "category" && activeCategory && (
          <div>
            <button className="cv-nav-link" onClick={() => setView("home")} style={{ marginBottom: 40, color: "#444" }}>← {t.back}</button>
            <div style={{ position: "relative", paddingLeft: 32, marginBottom: 48 }}>
              <div className="cv-hero-line" style={{ background: `linear-gradient(to bottom, transparent, ${activeCategory.color}, transparent)` }} />
              <div className="cv-section-label">— {activeCategory[lang]}</div>
              <h1 className="cv-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontStyle: "italic", fontWeight: 300, marginBottom: 12 }}>
                {activeCategory[lang]}
              </h1>
              <p className="cv-mono" style={{ fontSize: "0.6rem", color: "#333", letterSpacing: "0.12em" }}>{activeCategory[`${lang}_sub`]}</p>
            </div>

            {(articles[activeCategory.id] || []).length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p className="cv-mono" style={{ color: "#333", fontSize: "0.65rem", letterSpacing: "0.15em", marginBottom: 24 }}>
                  {lang === "es" ? "— SIN ARTÍCULOS AÚN —" : "— NO ARTICLES YET —"}
                </p>
                <button className="cv-primary-btn" onClick={() => setView("write")}>
                  {lang === "es" ? "Escribir el primero →" : "Write the first →"}
                </button>
              </div>
            ) : (articles[activeCategory.id] || []).map((a, i) => (
              <div key={a.id} className="cv-art-card" onClick={() => { setActiveArticle({ ...a, cat: activeCategory }); setView("article"); }}>
                <div style={{ display: "flex", gap: 20 }}>
                  <div className="cv-mono cv-dim" style={{ fontSize: "0.6rem", paddingTop: 6, minWidth: 28 }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ flex: 1 }}>
                    <h2 className="cv-art-title cv-display" style={{ fontSize: "1.7rem", fontStyle: "italic", fontWeight: 400, lineHeight: 1.25, marginBottom: 14 }}>
                      {lang === "es" ? a.es_title : a.en_title}
                    </h2>
                    <p className="cv-body" style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.9 }}>
                      {lang === "es" ? a.es_excerpt : a.en_excerpt}
                    </p>
                    <div className="cv-mono" style={{ marginTop: 14, fontSize: "0.55rem", color: "#333" }}>
                      {lang === "es" ? a.date : a.en_date} · {a.readTime} {t.readTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════ ARTICLE ══════════════════ */}
        {view === "article" && activeArticle && (
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <button className="cv-nav-link" style={{ marginBottom: 48, color: "#444" }}
              onClick={() => { if (activeArticle.cat) { setActiveCategory(activeArticle.cat); setView("category"); } else setView("home"); }}>
              ← {activeArticle.cat?.[lang] || t.back}
            </button>

            <div style={{ position: "relative", paddingLeft: 28, marginBottom: 48 }}>
              <div className="cv-hero-line" style={{ background: `linear-gradient(to bottom, ${activeArticle.cat?.color || "#C8102E"}, transparent)` }} />
              <span className="cv-tag" style={{ color: activeArticle.cat?.color, marginBottom: 20, display: "inline-block" }}>
                {activeArticle.cat?.[lang]}
              </span>
              <h1 className="cv-display" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.15, marginTop: 16, marginBottom: 24 }}>
                {lang === "es" ? activeArticle.es_title : activeArticle.en_title}
              </h1>
              <div className="cv-mono" style={{ fontSize: "0.55rem", color: "#333", letterSpacing: "0.12em" }}>
                {lang === "es" ? activeArticle.date : activeArticle.en_date} · {activeArticle.readTime} {t.readTime}
              </div>
            </div>

            <hr className="cv-divider" style={{ margin: "32px 0" }} />

            <p className="cv-body" style={{ fontSize: "1.15rem", color: "#888", marginBottom: 36, fontStyle: "italic", lineHeight: 1.9, borderLeft: `3px solid ${activeArticle.cat?.color || "#C8102E"}`, paddingLeft: 24 }}>
              {lang === "es" ? activeArticle.es_excerpt : activeArticle.en_excerpt}
            </p>

            <div className="cv-body" style={{ color: "#555", fontSize: "1rem", lineHeight: 2 }}>
              <p style={{ marginBottom: 24 }}>
                {lang === "es"
                  ? "Este artículo está siendo desarrollado. Cartógrafo Veritas es un espacio de exploración intelectual donde cada tema se aborda con la profundidad y el rigor que merece."
                  : "This article is being developed. Cartógrafo Veritas is a space of intellectual exploration where each topic is addressed with the depth and rigor it deserves."}
              </p>
              <p>
                {lang === "es"
                  ? "Usa el asistente de IA para explorar más sobre este tema, investigar en profundidad o debatir las ideas centrales."
                  : "Use the AI assistant to explore more about this topic, research in depth, or debate the central ideas."}
              </p>
            </div>

            <div style={{ marginTop: 48, padding: 28, border: "1px solid #141414", background: "#0a0a0a", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(to right, ${activeArticle.cat?.color || "#C8102E"}, transparent)` }} />
              <div className="cv-section-label">— {lang === "es" ? "EXPLORAR MÁS" : "EXPLORE MORE"}</div>
              <p className="cv-body" style={{ color: "#444", fontSize: "0.9rem", marginBottom: 20, lineHeight: 1.8 }}>
                {lang === "es" ? "Investiga este tema con el asistente IA, genera ideas relacionadas o debate los argumentos centrales." : "Research this topic with the AI assistant, generate related ideas, or debate the central arguments."}
              </p>
              <button className="cv-primary-btn" onClick={() => {
                setAiMode(0);
                setAiInput(lang === "es" ? `Investiga en profundidad: ${activeArticle.es_title}` : `Research in depth: ${activeArticle.en_title}`);
                setView("ai");
              }}>
                {lang === "es" ? "Investigar con IA →" : "Research with AI →"}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════ LIBRARY ══════════════════ */}
        {view === "library" && (
          <div>
            <div style={{ position: "relative", paddingLeft: 32, marginBottom: 48 }}>
              <div className="cv-hero-line" />
              <div className="cv-section-label">— {t.library}</div>
              <h1 className="cv-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontStyle: "italic", fontWeight: 300, marginBottom: 12 }}>
                {t.library}
              </h1>
              <p className="cv-mono" style={{ fontSize: "0.6rem", color: "#333", letterSpacing: "0.12em" }}>{t.librarySubtitle}</p>
            </div>

            {/* Search + filter */}
            <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
              <input className="cv-input" style={{ flex: 1, minWidth: 200 }} placeholder={t.searchBooks} value={bookSearch} onChange={e => setBookSearch(e.target.value)} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {genres.map(g => (
                  <button key={g} className={`cv-btn ${bookGenre === g ? "active" : ""}`} style={{ fontSize: "0.55rem", padding: "6px 12px" }} onClick={() => setBookGenre(g)}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid-books">
              {filteredBooks.map(book => (
                <div key={book.id} className="cv-book-card">
                  <div style={{ width: 24, height: 3, background: GENRE_COLORS[book.genre] || "#444", marginBottom: 12 }} />
                  <h4 className="cv-display" style={{ fontSize: "0.95rem", fontStyle: "italic", marginBottom: 6, lineHeight: 1.3, color: "#E8E4DC" }}>{book.title}</h4>
                  <p className="cv-mono" style={{ fontSize: "0.55rem", color: "#444", letterSpacing: "0.08em" }}>{book.author}</p>
                  <div style={{ marginTop: 10 }}>
                    <span className="cv-tag" style={{ color: GENRE_COLORS[book.genre] || "#444", fontSize: "0.5rem" }}>{book.genre}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }} className="cv-mono">
                {lang === "es" ? "No se encontraron libros" : "No books found"}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════ AI ══════════════════ */}
        {view === "ai" && (
          <div>
            <div style={{ position: "relative", paddingLeft: 32, marginBottom: 40 }}>
              <div className="cv-hero-line" />
              <div className="cv-section-label">— {t.aiAssistant}</div>
              <h1 className="cv-display" style={{ fontSize: "2.8rem", fontStyle: "italic", fontWeight: 300 }}>{t.aiTitle}</h1>
              <p className="cv-mono" style={{ fontSize: "0.6rem", color: "#333", letterSpacing: "0.12em", marginTop: 8 }}>{t.aiSubtitle}</p>
            </div>

            {/* Mode selector */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {aiModes.map((m, i) => (
                <button key={m.id} className={`cv-btn ${aiMode === i ? "active" : ""}`}
                  onClick={() => { setAiMode(i); setAiMessages([]); }}>
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {/* Chat */}
            <div style={{ minHeight: 320, maxHeight: 500, overflowY: "auto", border: "1px solid #111", padding: 28, background: "#0a0a0a", marginBottom: 12, display: "flex", flexDirection: "column", gap: 20 }}>
              {aiMessages.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{ fontSize: "2.5rem", color: "#1a1a1a", marginBottom: 16 }}>◈</div>
                  <div className="cv-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#222", marginBottom: 28 }}>
                    {t.startPrompt.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    {(lang === "es" ? ["¿Quién controla realmente el mundo?", "Explícame a Nietzsche", "Ideas sobre geopolítica México"] : ["Who really controls the world?", "Explain Nietzsche to me", "Ideas on Mexico's geopolitics"]).map(s => (
                      <button key={s} className="cv-btn" style={{ fontSize: "0.55rem" }} onClick={() => sendAi(s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              {aiMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "80%", padding: "14px 18px", background: m.role === "user" ? "#111" : "#0f0f0f", border: `1px solid ${m.role === "user" ? "#1a1a1a" : "#0f0f0f"}`, borderLeft: m.role === "assistant" ? "2px solid #C8102E" : "none", fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.8, color: m.role === "user" ? "#888" : "#666", whiteSpace: "pre-wrap" }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ padding: "14px 18px", border: "1px solid #111", borderLeft: "2px solid #C8102E" }}>
                    {lang === "es" ? "PROCESANDO..." : "PROCESSING..."}
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>

            <div style={{ display: "flex" }}>
              <input className="cv-input" style={{ borderRight: "none" }} value={aiInput} onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendAi()}
                placeholder={lang === "es" ? `Pregunta sobre ${aiModes[aiMode].label.toLowerCase()}...` : `Ask about ${aiModes[aiMode].label.toLowerCase()}...`} />
              <button onClick={() => sendAi()} style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.12em", padding: "10px 24px", background: "transparent", border: "1px solid #C8102E", color: "#C8102E", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = "#C8102E"; (e.target as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "#C8102E"; }}>
                {t.send} →
              </button>
            </div>
            {aiMessages.length > 0 && (
              <button className="cv-nav-link" style={{ marginTop: 14 }} onClick={() => setAiMessages([])}>✕ {t.clearChat}</button>
            )}
          </div>
        )}

        {/* ══════════════════ WRITE ══════════════════ */}
        {view === "write" && (
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <div style={{ position: "relative", paddingLeft: 32, marginBottom: 40 }}>
              <div className="cv-hero-line" />
              <div className="cv-section-label">— {t.write}</div>
              <h1 className="cv-display" style={{ fontSize: "2.8rem", fontStyle: "italic", fontWeight: 300 }}>{t.newArticle}</h1>
            </div>

            {[
              { label: t.title, key: "title", type: "input", placeholder: lang === "es" ? "El título de tu artículo..." : "Your article title..." },
              { label: t.tags, key: "tags", type: "input", placeholder: "Filosofía, Nietzsche, Existencialismo..." },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: 20 }}>
                <div className="cv-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", color: "#333", textTransform: "uppercase", marginBottom: 8 }}>{field.label}</div>
                <input className="cv-input" placeholder={field.placeholder} value={newArt[field.key]} onChange={e => setNewArt({ ...newArt, [field.key]: e.target.value })} />
              </div>
            ))}

            <div style={{ marginBottom: 20 }}>
              <div className="cv-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", color: "#333", textTransform: "uppercase", marginBottom: 8 }}>{t.category}</div>
              <select className="cv-select" value={newArt.category} onChange={e => setNewArt({ ...newArt, category: e.target.value })}>
                <option value="">{lang === "es" ? "Selecciona una categoría..." : "Select a category..."}</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c[lang]}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div className="cv-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", color: "#333", textTransform: "uppercase", marginBottom: 8 }}>{t.content}</div>
              <textarea className="cv-textarea" placeholder={lang === "es" ? "Escribe tu artículo aquí..." : "Write your article here..."} value={newArt.content} onChange={e => setNewArt({ ...newArt, content: e.target.value })} />
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <button className="cv-primary-btn" onClick={() => {
                if (!newArt.title || !newArt.category || !newArt.content) return;
                const tags = newArt.tags.split(",").map(t => t.trim()).filter(Boolean);
                const words = newArt.content.split(" ").length;
                const article = {
                  id: Date.now(),
                  es_title: newArt.title, en_title: newArt.title,
                  es_excerpt: newArt.content.slice(0, 200) + "...",
                  en_excerpt: newArt.content.slice(0, 200) + "...",
                  content: newArt.content,
                  date: new Date().toLocaleDateString("es-MX", { month: "long", year: "numeric" }),
                  en_date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
                  readTime: String(Math.max(1, Math.round(words / 200))),
                  tags
                };
                setArticles(prev => ({ ...prev, [newArt.category]: [...(prev[newArt.category] || []), article] }));
                const cat = CATEGORIES.find(c => c.id === newArt.category);
                setNewArt({ title: "", content: "", category: "", tags: "" });
                if (cat) { setActiveCategory(cat); setView("category"); }
              }}>
                {t.publish} →
              </button>
              <button className="cv-btn" onClick={() => {
                if (newArt.title) { setAiMode(3); setAiInput(lang === "es" ? `Ayúdame a escribir: "${newArt.title}"` : `Help me write: "${newArt.title}"`); setView("ai"); }
              }}>
                ✦ {t.aiHelp}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #0f0f0f", padding: "36px 48px", marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div className="cv-display" style={{ fontSize: "1.2rem", fontStyle: "italic", fontWeight: 300 }}>
          Cartógrafo <span className="cv-gold">Veritas</span>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {CATEGORIES.map(c => (
            <button key={c.id} className="cv-nav-link" onClick={() => { setActiveCategory(c); setView("category"); }}>{c[lang]}</button>
          ))}
        </div>
        <div className="cv-mono" style={{ fontSize: "0.5rem", color: "#222", letterSpacing: "0.15em" }}>{t.tagline.toUpperCase()}</div>
      </footer>
    </div>
  );
}
