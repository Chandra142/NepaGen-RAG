import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import { makeFadeUp } from '../utils/MotionVariants.js';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-20 border-t border-slate-200 bg-white/90 py-12 text-slate-900 transition-colors duration-500 dark:border-white/10 dark:bg-surface-deep/90 dark:text-white md:py-16">
      <div className="absolute inset-0 bg-mesh-lights opacity-10 dark:opacity-20" aria-hidden />
      <motion.div
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 text-center"
        variants={makeFadeUp(0.1, 20)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="flex flex-col items-center gap-3">
            <span className="rounded-full border border-slate-200/70 px-4 py-1 text-[11px] uppercase tracking-[0.5em] text-slate-500 dark:border-white/15 dark:text-white/60">
            NepaGen
          </span>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-white/80">{t('footer.tagline')}</p>
        </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-white/70">
          {[
            { href: '#hero', label: t('nav.home') },
            { href: '#chat', label: t('nav.chat') },
            { href: '#about', label: t('nav.about') },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                const target = document.querySelector(link.href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
                className="transition duration-200 hover:text-slate-900 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="flex flex-col items-center gap-2 text-xs text-slate-500 dark:text-white/60">
          <p>{t('footer.rights')}</p>
          <p>Made with ❤️ in Kathmandu</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
