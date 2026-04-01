import { motion } from 'framer-motion';
import ChatWindow from '../components/ChatWindow.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const Chat = () => {
  const { t } = useLanguage();

  return (
    <section id="chat" className="scroll-mt-28 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('chat.title')}</h2>
          <p className="mt-2 text-slate-600 dark:text-white/70">{t('chat.subtitle')}</p>
          <div className="mt-6">
            <ChatWindow />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Chat;
