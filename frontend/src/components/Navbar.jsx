import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle from './LanguageToggle.jsx';
import DarkModeToggle from './DarkModeToggle.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { navVariants } from '../utils/MotionVariants.js';

const NAV_ITEMS = [
  { href: '#hero', key: 'nav.home' },
  { href: '#chat', key: 'nav.chat' },
  { href: '#about', key: 'nav.about' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const { t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const updateCondensed = () => {
      setCondensed(window.scrollY > 20);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCondensed);
        ticking = true;
      }
    };
    updateCondensed();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const options = { threshold: 0.35 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, options);

    NAV_ITEMS.forEach(({ href }) => {
      const node = document.querySelector(href);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (hash) => {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (href) => (event) => {
    event.preventDefault();
    scrollToSection(href);
    setMenuOpen(false);
  };

  const items = useMemo(() => NAV_ITEMS, []);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-6 sm:px-6">
      <motion.nav
        variants={navVariants}
        initial="expanded"
        animate={condensed ? 'condensed' : 'expanded'}
        className="mx-auto flex max-w-6xl items-center gap-4 rounded-[32px] border border-slate-200/70 bg-white/80 px-4 py-3 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/15 dark:bg-surface-dusk/70 dark:text-white"
        style={{ willChange: 'transform, opacity' }}
      >
        <button
          type="button"
          onClick={() => scrollToSection('#hero')}
          className="flex items-center gap-3 text-lg font-semibold"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-nepalBlue to-brand-himalayanPurple text-2xl shadow-glow">
            ⚡
          </span>
          <div className="leading-tight">
            <p className="font-bold text-slate-900 dark:text-white">NepaGen RAG</p>
            <p className="text-xs text-slate-500 dark:text-white/70">Premium AI Chat</p>
          </div>
        </button>

        <nav className="relative hidden items-center gap-6 text-sm font-medium md:flex">
          {items.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              onClick={handleNavClick(href)}
              className={`relative px-1 py-2 transition duration-200 ${
                activeSection === href
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-white/70 dark:hover:text-white'
              }`}
            >
              <span className="relative z-10">{t(key)}</span>
              {activeSection === href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-brand-everestGlow"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <DarkModeToggle />
          <button
            type="button"
            onClick={() => scrollToSection('#chat')}
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-nepalBlue to-brand-himalayanPurple px-5 py-2 text-sm font-semibold text-white shadow-glow"
          >
            {t('nav.start')}
            <span className="text-base transition duration-200 group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        <button
          className="rounded-full border border-slate-300/70 p-2 text-2xl text-slate-900 transition-colors duration-200 dark:border-white/20 dark:text-white md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mx-auto mt-3 flex max-w-6xl flex-col gap-4 rounded-[28px] border border-slate-200/70 bg-white/90 p-5 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-colors duration-500 dark:border-white/15 dark:bg-surface-dusk/90 dark:text-white md:hidden"
          >
            {items.map(({ href, key }) => (
              <a
                key={key}
                href={href}
                onClick={handleNavClick(href)}
                className={`rounded-2xl px-3 py-2 text-sm transition duration-200 ${
                  activeSection === href
                    ? 'bg-white/70 text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-white/70 dark:hover:text-white'
                }`}
              >
                {t(key)}
              </a>
            ))}
            <div className="flex flex-col gap-3">
              <LanguageToggle />
              <DarkModeToggle />
              <button
                type="button"
                onClick={() => {
                  scrollToSection('#chat');
                  setMenuOpen(false);
                }}
                className="rounded-full bg-gradient-to-r from-brand-nepalBlue to-brand-himalayanPurple px-4 py-3 text-center text-sm font-semibold text-white shadow-glow"
              >
                {t('nav.start')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
