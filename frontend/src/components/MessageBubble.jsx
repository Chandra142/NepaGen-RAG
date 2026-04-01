import { memo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 6-11 11-5-5" />
  </svg>
);

const NepagenAvatar = () => (
  <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm border border-slate-200 dark:border-white/10">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  </div>
);

const MessageBubble = ({ message, onCopy, copyLabel, copiedLabel }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const attachments = message.attachments ?? [];

  const handleCopy = async () => {
    await onCopy(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full justify-end my-6 px-2"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex max-w-[85%] flex-col items-end gap-2">
          {attachments.length > 0 && (
            <div className="flex flex-wrap justify-end gap-2 text-[11px] font-medium text-slate-500 dark:text-white/60">
              {attachments.map((file) => (
                <div key={file.name} className="flex items-center gap-1.5 rounded-full border border-slate-200/50 bg-slate-50 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
                  <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13.234 20.252 21 12.3v0a4 4 0 0 0-5.657-5.656l-9.192 9.192a2 2 0 0 0 2.829 2.828l8.485-8.485"/></svg>
                  <span className="max-w-[120px] truncate">{file.name}</span>
                </div>
              ))}
            </div>
          )}
          <div className="rounded-2xl rounded-tr-sm bg-slate-100 px-5 py-3.5 text-[15px] leading-relaxed text-slate-800 dark:bg-[#1E1E1E] dark:text-gray-100 shadow-sm border border-slate-200/50 dark:border-white/[0.04]">
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Assistant Message
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full justify-start my-6 px-2"
      aria-live={message.streaming ? 'polite' : undefined}
    >
      <div className="flex max-w-[92%] items-start gap-4">
        <NepagenAvatar />
        
        <div className="flex flex-col gap-1 min-w-0 pt-0.5">
          <div className="text-[15px] leading-[1.65] text-slate-800 dark:text-gray-200 break-words">
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.streaming && (
              <span className="inline-block h-3.5 w-2 ml-1 animate-pulse bg-slate-400 dark:bg-gray-500 align-middle" />
            )}
          </div>

          <div className="mt-2 flex opacity-0 transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100 group-hover:opacity-100">
             <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md text-[11px] font-medium text-slate-400 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label={copied ? copiedLabel : copyLabel}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? copiedLabel : copyLabel}</span>
              </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(MessageBubble);
