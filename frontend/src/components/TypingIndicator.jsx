const TypingIndicator = ({ label }) => (
  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/70">
    <div className="glass-card flex items-center gap-2 rounded-full px-4 py-2">
      <span className="text-xs uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-2 w-2 rounded-full bg-slate-500/70 dark:bg-white/70"
            style={{ animation: `pulse-dot 1s ease-in-out ${dot * 0.15}s infinite` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default TypingIndicator;
