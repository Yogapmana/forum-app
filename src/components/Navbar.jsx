import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/slice';
import { toggleTheme } from '../states/theme/slice';

function Navbar() {
  const authUser = useSelector((state) => state.authUser);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  const onToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const isActive = (path) => pathname === path;
  const isDark = theme === 'dark';

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 dark:bg-dark-card/95 backdrop-blur-md border-b border-white/[0.08] dark:border-dark-border shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center shadow-md shadow-accent/25 group-hover:shadow-accent/40 transition-shadow duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors duration-200">
            Forum Diskusi
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive('/') ? 'text-white bg-white/[0.12]' : 'text-white/60 hover:text-white hover:bg-white/[0.06]'}
            `}
          >
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Threads
            </span>
            {isActive('/') && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />
            )}
          </Link>

          <Link
            to="/leaderboard"
            className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive('/leaderboard') ? 'text-white bg-white/[0.12]' : 'text-white/60 hover:text-white hover:bg-white/[0.06]'}
            `}
          >
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
              Leaderboard
            </span>
            {isActive('/leaderboard') && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />
            )}
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-2" />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-yellow-300 hover:bg-white/[0.06] transition-all duration-300"
            aria-label={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
          >
            {/* Sun icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[18px] h-[18px] absolute transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            {/* Moon icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[18px] h-[18px] absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-1" />

          {authUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="w-7 h-7 rounded-full ring-2 ring-accent/40 shadow-sm"
                />
                <span className="hidden sm:inline text-sm font-medium text-white/90">
                  {authUser.name}
                </span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-400/[0.08] transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-accent to-blue-400 hover:from-accent-dark hover:to-accent shadow-md shadow-accent/20 hover:shadow-accent/30 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
