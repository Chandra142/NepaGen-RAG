import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

const LANGUAGE_META = {
  ne: { label: 'नेपाली', short: 'NE', flag: '🇳🇵' },
  en: { label: 'English', short: 'EN', flag: '🇬🇧' },
};

const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const current = LANGUAGE_META[language];

  return (
    <motion.button
      type="button"
      layout
      onClick={toggleLanguage}
      aria-label={`${t('nav.language')}: ${current.label}`}
      className="flex items-center gap-3 rounded-full border border-slate-200/60 bg-white px-4 py-2 text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.1)] transition duration-200 hover:border-slate-400/70 dark:border-white/15 dark:bg-white/5 dark:text-white dark:shadow-glass"
      whileTap={{ scale: 0.97 }}
    >
      <span aria-hidden className="text-2xl">
        {current.flag}
      </span>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">{t('nav.language')}</span>
        <span className="text-sm font-semibold text-slate-900 dark:text-white">{current.label}</span>
      </div>
    </motion.button>
  );
};

export default LanguageToggle;
