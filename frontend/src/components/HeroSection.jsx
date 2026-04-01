import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import { makeFadeUp, staggerChildren, heroHighlight } from '../utils/MotionVariants.js';

const PARTICLES = [
  { id: 1, top: '12%', left: '16%', size: 10, delay: 0 },
  { id: 2, top: '22%', left: '70%', size: 14, delay: 0.4 },
  { id: 3, top: '42%', left: '82%', size: 8, delay: 0.8 },
  { id: 4, top: '65%', left: '12%', size: 12, delay: 0.2 },
  { id: 5, top: '78%', left: '46%', size: 6, delay: 0.6 },
];

const HERO_FEATURES = {
  ne: [
    'GPU-अनुकूलित एनिमेसन',
    'द्विभाषिक UI + प्रतिलिपि',
    'TokWise स्ट्रीमिंग उत्तर',
  ],
  en: ['GPU-friendly animations', 'Bilingual UI + copy', 'TokWise streaming answers'],
};

const NEURAL_NODES = [
  { id: 'n1', x: 8, y: 18, radius: 1.4 },
  { id: 'n2', x: 24, y: 32, radius: 1 },
  { id: 'n3', x: 40, y: 18, radius: 1.2 },
  { id: 'n4', x: 58, y: 30, radius: 1 },
  { id: 'n5', x: 72, y: 16, radius: 1.3 },
  { id: 'n6', x: 85, y: 34, radius: 1 },
  { id: 'n7', x: 18, y: 55, radius: 1.1 },
  { id: 'n8', x: 36, y: 62, radius: 1.4 },
  { id: 'n9', x: 55, y: 58, radius: 1 },
  { id: 'n10', x: 74, y: 64, radius: 1.2 },
  { id: 'n11', x: 32, y: 80, radius: 1 },
  { id: 'n12', x: 60, y: 82, radius: 1.3 },
];

const NEURAL_LINKS = [
  ['n1', 'n2'],
  ['n2', 'n3'],
  ['n3', 'n4'],
  ['n4', 'n5'],
  ['n5', 'n6'],
  ['n2', 'n7'],
  ['n7', 'n8'],
  ['n8', 'n9'],
  ['n9', 'n10'],
  ['n8', 'n11'],
  ['n9', 'n12'],
  ['n10', 'n12'],
];

const NeuralNetworkBackdrop = ({ reduceMotion }) => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden
  >
    <defs>
      <linearGradient id="neural-line" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(147,197,253,0.3)" />
        <stop offset="100%" stopColor="rgba(192,132,252,0.3)" />
      </linearGradient>
      <radialGradient id="neural-node" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
      </radialGradient>
    </defs>

    <g transformOrigin="50% 50%">
      {NEURAL_LINKS.map(([fromId, toId]) => {
        const from = NEURAL_NODES.find((node) => node.id === fromId);
        const to = NEURAL_NODES.find((node) => node.id === toId);
        if (!from || !to) return null;
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#neural-line)"
            strokeWidth={0.2}
            strokeLinecap="round"
          />
        );
      })}

      {NEURAL_NODES.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.radius}
          fill="url(#neural-node)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={0.1}
        />
      ))}
    </g>
  </svg>
);

const HeroSection = () => {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion ? undefined : staggerChildren(0.14, 0.16);
  const headlineVariant = prefersReducedMotion ? undefined : heroHighlight;

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20 lg:pb-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-mesh-aurora bg-[length:200%_200%] opacity-70 animate-gradient-flow will-change-transform"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-[420px] max-w-3xl rounded-full bg-clip-padding blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.35), transparent 35%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.4), transparent 40%)',
        }}
      />
      <div className="absolute inset-0" aria-hidden>
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-white/60 shadow-glow will-change-transform"
            style={{
              top: particle.top,
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `soft-pulse 6s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <NeuralNetworkBackdrop reduceMotion={prefersReducedMotion} />

      <motion.div
        className="relative mx-auto flex max-w-5xl flex-col items-start gap-16 text-slate-900 transition-colors duration-500 dark:text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative z-10 max-w-3xl">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 transition-colors dark:border-white/20 dark:text-white/70"
            variants={makeFadeUp(0, 12)}
          >
            {t('hero.badge')}
          </motion.span>

          <motion.h1
            className="mt-6 text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            variants={headlineVariant}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p className="mt-6 text-lg text-slate-600 dark:text-white/80" variants={makeFadeUp(0.12, 18)}>
            {t('hero.subtitle')}
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-4" variants={makeFadeUp(0.18, 18)}>
            <a
              href="#chat"
              className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-nepalBlue to-brand-himalayanPurple px-8 py-3 text-base font-semibold text-white shadow-glow transition-transform duration-200 will-change-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">{t('hero.cta')}</span>
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-70 transition duration-300 group-hover:opacity-100">
                <span className="absolute inset-0 rounded-full border border-white/30" />
                <span className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
              </span>
            </a>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 px-7 py-3 text-base text-slate-700 transition duration-200 hover:border-slate-500 hover:text-slate-900 dark:border-white/25 dark:text-white/80 dark:hover:border-white/40 dark:hover:text-white"
            >
              <span>{t('hero.scroll')}</span>
              <span className="h-2 w-2 rounded-full bg-slate-600/80 dark:bg-white/70" />
            </a>
          </motion.div>

          <motion.ul className="mt-10 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-white/80" variants={makeFadeUp(0.22, 16)}>
            {HERO_FEATURES[language].map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 backdrop-blur-md dark:border-white/10 dark:bg-white/5"
              >
                <span className="h-2 w-2 rounded-full bg-brand-everestGlow drop-shadow-glow" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

      </motion.div>

      <motion.div
        className="relative mx-auto mt-16 flex w-fit flex-col items-center text-xs uppercase tracking-[0.6em] text-slate-500 dark:text-white/70"
        variants={makeFadeUp(0.28, 12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <span>{language === 'ne' ? 'स्क्रोल गर्नुहोस्' : 'Scroll down'}</span>
        <span className="mt-3 flex h-12 w-px flex-col overflow-hidden">
          <span className="h-full w-full animate-float bg-gradient-to-b from-transparent via-slate-500/70 to-transparent dark:via-white/80" />
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
