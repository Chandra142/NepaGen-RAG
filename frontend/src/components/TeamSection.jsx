import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

const teamData = [
  {
    name: 'Jinee',
    role: {
      ne: 'मुख्य मेसिन लर्निङ इन्जिनियर',
      en: 'Lead Machine Learning Engineer',
    },
    desc: {
      ne: 'नेपाली RAG मोडलको प्रशिक्षण, अनुकूलन तथा NLP पाइपलाइनको मुख्य जिम्मेवारी।',
      en: 'Responsible for training and optimizing the Nepali RAG model and NLP pipelines.',
    },
    img: 'https://i.ibb.co/N6XhGJH/profile-placeholder.png',
  },
  {
    name: 'Ram',
    role: {
      ne: 'फुल–स्ट्याक डेभलपर तथा सिस्टम एकीकरण प्रमुख',
      en: 'Full-Stack Developer & System Integrator',
    },
    desc: {
      ne: 'UI/UX, फ्रन्टएन्ड-ब्याकएन्ड विकास तथा RAG मोडल एकीकरणमा नेतृत्व।',
      en: 'Leads UI/UX, frontend-backend development and RAG system integration.',
    },
    img: 'https://i.ibb.co/N6XhGJH/profile-placeholder.png',
  },
  {
    name: 'Ishita',
    role: {
      ne: 'एआई अनुसन्धान तथा ज्ञान संरचना अभियन्ता',
      en: 'AI Research & Knowledge Architect',
    },
    desc: {
      ne: 'डाटासेट छनोट, अनुसन्धान, तथ्य गठन तथा RAG प्रदर्शन मूल्याङ्कन।',
      en: 'Handles dataset curation, research, factual grounding, and RAG evaluation.',
    },
    img: 'https://i.ibb.co/N6XhGJH/profile-placeholder.png',
  },
];

const TeamSection = () => {
  const { language } = useLanguage();

  return (
    <section
      id="team"
      className="scroll-mt-28 bg-gradient-to-b from-white via-transparent to-transparent px-6 py-14 text-slate-900 transition-colors duration-500 dark:from-white/5 dark:text-white sm:px-10 md:py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-3xl text-center text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl"
      >
        {language === 'ne' ? 'नेपाजेन टोली' : 'Meet the NepaGen Team'}
      </motion.h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {teamData.map((member, index) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            className="rounded-2xl border border-slate-200/70 bg-white p-6 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-slate-400/70 dark:border-white/15 dark:bg-white/10 dark:text-white dark:shadow-glass dark:hover:border-white/40"
          >
            <motion.img
              src={member.img}
              alt={member.name}
              className="mx-auto h-36 w-36 rounded-full border-2 border-slate-200 object-cover shadow-lg dark:border-white/30"
              whileHover={{ scale: 1.05 }}
            />
            <h3 className="mt-4 text-center text-xl font-semibold">{member.name}</h3>
            <p className="text-center text-sm font-medium text-brand-everestGlow">
              {member.role[language]}
            </p>
            <p className="mt-3 text-center text-sm text-slate-600 dark:text-white/80">{member.desc[language]}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
