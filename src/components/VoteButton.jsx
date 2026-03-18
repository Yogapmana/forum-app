function VoteButton({
  type, count, active, onClick, disabled,
}) {
  const isUp = type === 'up';

  const activeUpClass = 'text-accent bg-accent/10 shadow-sm shadow-accent/10';
  const activeDownClass = 'text-red-500 bg-red-500/10 shadow-sm shadow-red-500/10';
  const inactiveClass = 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10';

  let stateClass = inactiveClass;
  if (active && isUp) stateClass = activeUpClass;
  if (active && !isUp) stateClass = activeDownClass;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-lg transition-all duration-200
        ${disabled ? 'opacity-40 cursor-not-allowed' : stateClass}
        ${!disabled && !active ? 'hover:text-gray-600 dark:hover:text-gray-300' : ''}
      `}
    >
      {isUp ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-[18px] h-[18px] transition-transform duration-200 ${!disabled ? 'group-hover:-translate-y-0.5' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-[18px] h-[18px] transition-transform duration-200 ${!disabled ? 'group-hover:translate-y-0.5' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      )}
      <span className="font-semibold tabular-nums min-w-[1ch]">{count}</span>
    </button>
  );
}

export default VoteButton;
