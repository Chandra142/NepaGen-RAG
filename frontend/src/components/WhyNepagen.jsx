import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.1 + index * 0.05,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const IconGlyph = ({ name }) => {
  const props = { width: 28, height: 28, stroke: 'currentColor', strokeWidth: 1.8, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  switch (name) {
    case 'Stack':
      return (
        <svg {...props}>
          <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" />
          <path d="m4 15.5 8 4.5 8-4.5" />
          <path d="m4 12 8 4.5 8-4.5" />
        </svg>
      );
    case 'Target':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m20 12 2 .01" />
          <path d="M2 12h2" />
        </svg>
      );
    case 'Shield':
      return (
        <svg {...props}>
          <path d="M12 22s7-3.8 7-11V6l-7-4-7 4v5c0 7.2 7 11 7 11Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'FolderDown':
      return (
        <svg {...props}>
          <path d="M3 7a2 2 0 0 1 2-2h3l2 2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          <path d="M12 10v6" />
          <path d="m9.5 13.5 2.5 2.5 2.5-2.5" />
        </svg>
      );
    case 'Lock':
      return (
        <svg {...props}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <path d="M12 15v2" />
        </svg>
      );
    case 'Layers':
      return (
        <svg {...props}>
          <path d="m12 2 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
};

const WhyNepagen = () => {
  const { t } = useLanguage();
  const features = t('about.why.features') ?? [];

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/85 px-6 py-16 text-slate-900 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-3xl transition-colors duration-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-glass sm:px-10 md:py-20"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-nepalBlue/20 via-brand-himalayanPurple/10 to-transparent" aria-hidden />
      <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-everestGlow/20 blur-[120px]" aria-hidden />

      <motion.span
        className="inline-flex items-center rounded-full border border-slate-200/70 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-slate-500 dark:border-white/20 dark:text-white/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {t('about.why.badge')}
      </motion.span>

      <motion.h2
        className="mt-6 text-4xl font-bold text-slate-900 dark:text-white"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {t('about.title')}
      </motion.h2>

      <motion.p
        className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-white/80"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {t('about.vision')}
      </motion.p>

      <motion.p
        className="mt-2 max-w-4xl text-base text-slate-600 dark:text-white/70"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {t('about.why.lead')}
      </motion.p>

      <div className="mt-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.35)' }}
              className="group relative h-full rounded-3xl border border-slate-200/70 bg-white p-6 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 dark:border-white/15 dark:bg-white/5 dark:text-white dark:shadow-glass"
            >
              <motion.div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900/5 text-brand-everestGlow dark:bg-white/10"
                whileHover={{ rotate: 2 }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              >
                <IconGlyph name={feature.icon} />
              </motion.div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-white/50">
                {feature.eyebrow ?? feature.icon}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-white/80">{feature.body}</p>
              {feature.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-white/80">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-brand-everestGlow" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/8 to-brand-himalayanPurple/10 blur-2xl" aria-hidden />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.p
        className="mt-8 text-sm text-slate-500 dark:text-white/60"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {t('about.why.footnote')}
      </motion.p>
    </motion.section>
  );
};

export default WhyNepagen;
