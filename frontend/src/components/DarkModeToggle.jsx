import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return window.localStorage.getItem('theme') ?? 'dark';
  });
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label={t('nav.darkMode')}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white text-2xl text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.1)] backdrop-blur transition duration-200 hover:border-slate-400/80 dark:border-white/20 dark:bg-white/10 dark:text-white dark:shadow-glass"
    >
      <span aria-hidden className="drop-shadow-glow">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </motion.button>
  );
};

export default DarkModeToggle;
