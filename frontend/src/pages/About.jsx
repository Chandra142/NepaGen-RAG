import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import WhyNepagen from '../components/WhyNepagen.jsx';

const CONTEXT_PANELS = [
  {
    id: 'history',
    icon: '🧠',
    badge: { ne: 'इतिहास', en: 'Nepal history' },
    title: { ne: 'नेपाल इतिहास अभिलेख', en: 'Nepal History Archive' },
    body: {
      ne: 'राजपत्र, नियम, र इतिहास सम्बन्धी अभिलेखबाट सटीक उत्तर प्रदान गर्नुहोस्।',
      en: 'Retrieve authoritative responses from gazettes, regulations, and historic archives.',
    },
    links: ['mocit.gov.np', 'data.gov.np'],
  },
  {
    id: 'travel',
    icon: '🧭',
    badge: { ne: 'पर्यटन', en: 'Travel' },
    title: { ne: 'पर्यटन गाइड', en: 'Tourism Guide' },
    body: {
      ne: 'प्रदेश पर्यटन बोर्डका गाइडहरू मिलाएर स्वचालित यात्रा सिफारिस पठाउनुहोस्।',
      en: 'Blend provincial travel boards to deliver effortless itinerary guidance.',
    },
    links: ['visitnepal.com', 'lotse trails'],
  },
  {
    id: 'commerce',
    icon: '🏛️',
    badge: { ne: 'वाणिज्य', en: 'Commerce' },
    title: { ne: 'वाणिज्य सहायता', en: 'Commerce Support' },
    body: {
      ne: 'अनुसन्धान रिपोर्ट र बजार बौद्धिक सम्पत्तिलाई एकै स्थानमा व्यवस्थापन गर्नुहोस्।',
      en: 'Centralize market research and compliance insights for export teams.',
    },
    links: ['tepc.gov.np', 'wto library'],
  },
];

const KNOWLEDGE_SOURCES = [];

const About = () => {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-28 py-16 md:py-20">
      <div className="mx-auto max-w-6xl text-slate-900 transition-colors duration-500 dark:text-white">
        <div id="about-why">
          <WhyNepagen />
        </div>

        <div
          id="about-context"
          className="mt-10 rounded-[32px] border border-slate-200/70 bg-white/85 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-white/5 dark:shadow-glass"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-white/60">{t('chat.contextTitle')}</span>
            <p className="text-slate-600 dark:text-white/80">{t('chat.contextDescription')}</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CONTEXT_PANELS.map((panel) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="h-full rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-colors duration-500 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">
                  <span>{panel.icon}</span>
                  {language === 'ne' ? panel.badge.ne : panel.badge.en}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {language === 'ne' ? panel.title.ne : panel.title.en}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                  {language === 'ne' ? panel.body.ne : panel.body.en}
                </p>
                <ul className="mt-4 space-y-1 text-sm text-slate-600 dark:text-white/70">
                  {panel.links.map((link) => (
                    <li key={link} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-everestGlow" />
                      {link}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {KNOWLEDGE_SOURCES.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {KNOWLEDGE_SOURCES.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500 dark:text-white/50">Nepal History</p>
                <h4 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {language === 'ne' ? source.title.ne : source.title.en}
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/70">
                  {language === 'ne' ? source.detail.ne : source.detail.en}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
