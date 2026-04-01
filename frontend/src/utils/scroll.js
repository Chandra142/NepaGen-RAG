export const scrollToBottom = (ref) => {
  if (!ref?.current) return;
  ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
};
