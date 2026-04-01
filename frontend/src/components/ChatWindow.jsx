
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import MessageBubble from './MessageBubble.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import VoiceInput from './VoiceInput.jsx';
import FileUploader from './FileUploader.jsx';
import { askRAG } from '../utils/api.js';
import { scrollToBottom } from '../utils/scroll.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { staggerChildren } from '../utils/MotionVariants.js';

const uuid = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CHAT_STORAGE_KEY = 'nepagen-chat-history';
const STREAM_DELAY = {
  fast: 22,
  medium: 38,
};

const WELCOME_COPY = {
  ne: 'नमस्ते! म तपाईंको NepaGen सहायक हुँ। कुनै पनि दस्तावेज, नीति वा अनुसन्धानबारे सोध्नुहोस्।',
  en: 'Hi! I am your NepaGen assistant. Ask about docs, policies, or research in Nepali or English.',
};

const QUICK_SUGGESTIONS = {
  ne: ['चालु बजेटको सारांश तयार गर।', 'काठमाण्डूका लागि ५ दिनको यात्रा योजना बनाउ।', 'आईटी खरिद प्रक्रियाको चरण बताउ।'],
  en: ['Summarize the current Nepal budget.', 'Plan a five-day trek near Kathmandu.', 'Outline digital procurement steps.'],
};

const buildInitialMessages = (language) => [
  {
    id: uuid(),
    role: 'assistant',
    content: WELCOME_COPY[language] ?? WELCOME_COPY.en,
  },
];

const ChatWindow = () => {
  const { language, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    try {
      const cached = JSON.parse(window.localStorage.getItem(CHAT_STORAGE_KEY) ?? '[]');
      return cached.length ? cached : buildInitialMessages(language);
    } catch (error) {
      console.error('Failed to parse chat cache', error);
      return buildInitialMessages(language);
    }
  });
  const [input, setInput] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const quickSuggestions = useMemo(() => QUICK_SUGGESTIONS[language] ?? QUICK_SUGGESTIONS.en, [language]);
  const streamDelay = useMemo(() => (prefersReducedMotion ? STREAM_DELAY.medium : STREAM_DELAY.fast), [prefersReducedMotion]);

  useEffect(() => {
    scrollToBottom(chatBodyRef.current);
  }, [messages]);

  useEffect(() => {
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages(buildInitialMessages(language));
    }
  }, [language, messages.length]);

  const handleCopy = useCallback(async (content) => {
    if (!navigator?.clipboard) return;
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error('Copy failed', error);
    }
  }, []);

  const streamAssistantResponse = useCallback(
    async (answer) => {
      const assistantId = uuid();
      const tokens = answer.split(/\s+/).filter(Boolean);
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '', streaming: true }]);

      for (const token of tokens) {
        await wait(streamDelay);
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: message.content ? `${message.content} ${token}` : token,
                }
              : message
          )
        );
      }

      setMessages((prev) =>
        prev.map((message) => (message.id === assistantId ? { ...message, streaming: false } : message))
      );
    },
    [streamDelay]
  );

  const sendPrompt = useCallback(
    async (promptText) => {
      const trimmed = promptText.trim();
      if (!trimmed) return;

      const userMessage = {
        id: uuid(),
        role: 'user',
        content: trimmed,
        attachments: pendingFiles,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setPendingFiles([]);
      setIsTyping(true);
      setShowSkeleton(true);

      try {
        const response = await askRAG(trimmed, language);
        await streamAssistantResponse(response.answer ?? '');
      } catch (error) {
        console.error('Prompt failed', error);
        setMessages((prev) => [
          ...prev,
          {
            id: uuid(),
            role: 'assistant',
            content:
              language === 'ne'
                ? 'क्षमा गर्नुहोस्, सेवा अस्थायी रूपमा उपलब्ध भएन। कृपया केहीबेरपछि प्रयास गर्नुहोस्।'
                : 'Sorry, the service is temporarily unavailable. Please try again shortly.',
          },
        ]);
      } finally {
        setIsTyping(false);
        setShowSkeleton(false);
      }
    },
    [language, pendingFiles, streamAssistantResponse]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      sendPrompt(input);
    },
    [input, sendPrompt]
  );

  const handleSuggestion = useCallback(
    (suggestion) => {
      setInput(suggestion);
      sendPrompt(suggestion);
    },
    [sendPrompt]
  );

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files ?? []);
    if (files.length) {
      setPendingFiles((prev) => [...prev, ...files]);
    }
    setDropActive(false);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDropActive(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    if (!dropZoneRef.current?.contains(event.relatedTarget)) {
      setDropActive(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setMessages(buildInitialMessages(language));
    window.localStorage.removeItem(CHAT_STORAGE_KEY);
  }, [language]);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 md:py-12">
      <div className="relative overflow-hidden rounded-[24px] border border-slate-200/60 bg-white/95 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#0B0B0B] dark:shadow-none">
        <div className="flex flex-col h-[75vh] max-h-[800px]">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-white/5">
            <h2 className="text-sm font-semibold tracking-wide text-slate-800 dark:text-gray-200">
              {language === 'ne' ? 'नयाँ कुराकानी' : 'New Conversation'}
            </h2>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors dark:text-white/40 dark:hover:text-white"
            >
              {t('chat.clear')}
            </button>
          </div>

          <AnimatePresence>
            {pendingFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 flex flex-wrap gap-2 text-xs"
              >
                {pendingFiles.map((file) => (
                  <span key={file.name} className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white/80">
                    📁 {file.name}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth"
          >
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={handleCopy}
                copyLabel={t('chat.copy')}
                copiedLabel={t('chat.copied')}
              />
            ))}

            {showSkeleton && (
              <div className="my-6 flex max-w-[80%] items-start gap-4 px-2">
                <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 animate-pulse" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-2.5 w-1/3 rounded-full bg-slate-200 dark:bg-white/10 animate-pulse" />
                  <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-white/10 animate-pulse" />
                </div>
              </div>
            )}

            {isTyping && (
              <TypingIndicator label={language === 'ne' ? 'NepaGen सोच्दै...' : 'NepaGen is typing...'} />
            )}
          </div>

          {/* Input Area */}
          <div className="px-6 pb-6 pt-2">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestion(suggestion)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-[rgba(255,255,255,0.03)] dark:text-white/70 dark:hover:bg-[rgba(255,255,255,0.08)]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form
                ref={dropZoneRef}
                onSubmit={handleSubmit}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`flex flex-col rounded-[20px] border shadow-sm transition-all duration-200 bg-white dark:bg-[#1A1A1A] ${
                  inputFocused ? 'border-brand-everestGlow/50 ring-2 ring-brand-everestGlow/10' : 'border-slate-300/80 dark:border-white/[0.08]'
                } ${dropActive ? 'border-brand-everestGlow ring-2 ring-brand-everestGlow/20 bg-brand-everestGlow/5' : ''}`}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder={t('chat.inputPlaceholder')}
                  className="w-full resize-none min-h-[60px] max-h-48 bg-transparent px-4 py-3 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-white/40"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      sendPrompt(input);
                    }
                  }}
                  rows={1}
                />
                
                <div className="flex items-center justify-between px-3 pb-3">
                  <div className="flex items-center gap-2">
                    <FileUploader
                      label={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                      }
                      onFiles={(files) => setPendingFiles((prev) => [...prev, ...files])}
                      className="text-slate-400 hover:text-slate-800 dark:text-white/50 dark:hover:text-white px-2 py-1.5 focus:outline-none"
                    />
                    <VoiceInput
                      onTranscript={(transcript) => setInput((prev) => `${prev ? `${prev} ` : ''}${transcript}`)}
                      startLabel={null}
                      stopLabel={null}
                      className="text-slate-400 hover:text-slate-800 dark:text-white/50 dark:hover:text-white p-1"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white transition-opacity disabled:opacity-30 dark:bg-white dark:text-slate-900"
                    aria-label={t('chat.send')}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatWindow;
