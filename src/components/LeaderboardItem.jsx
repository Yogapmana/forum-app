function LeaderboardItem({ user, score, rank }) {
  const isTop3 = rank <= 3;

  const rankBadge = () => {
    if (rank === 1) {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-md shadow-yellow-400/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-md shadow-gray-400/25">
          <span className="text-white font-bold text-sm">2</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-400/25">
          <span className="text-white font-bold text-sm">3</span>
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">{rank}</span>
      </div>
    );
  };

  return (
    <div className={`group flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5
      ${isTop3
      ? 'bg-gradient-to-r from-white to-accent/[0.03] dark:from-dark-card dark:to-accent/[0.06] border-accent/15 dark:border-accent/25 shadow-sm hover:shadow-md hover:shadow-accent/5'
      : 'bg-white dark:bg-dark-card border-gray-200/80 dark:border-dark-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-accent/20'}
    `}
    >
      {rankBadge()}

      <img
        src={user.avatar}
        alt={user.name}
        className={`w-11 h-11 rounded-full shadow-sm
          ${isTop3 ? 'ring-2 ring-accent/30' : 'ring-2 ring-gray-100 dark:ring-dark-border'}
        `}
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-primary dark:text-gray-100 truncate">{user.name}</p>
        {user.email && (
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user.email}</p>
        )}
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <span className={`text-lg font-bold tabular-nums
          ${isTop3 ? 'text-accent' : 'text-primary-light dark:text-gray-300'}
        `}
        >
          {score}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">poin</span>
      </div>
    </div>
  );
}

export default LeaderboardItem;
