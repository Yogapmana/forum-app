import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { asyncPreloadProcess } from './states/isPreload/slice';
import Navbar from './components/Navbar';
import LoadingBar from './components/LoadingBar';
import ThreadsPage from './pages/ThreadsPage';
import DetailThreadPage from './pages/DetailThreadPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const isPreload = useSelector((state) => state.isPreload);
  const authUser = useSelector((state) => state.authUser);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isPreload) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <LoadingBar loading />
        <p className="text-gray-400 dark:text-gray-500">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} />
      <Navbar />
      <main className="pb-8">
        <Routes>
          <Route path="/" element={<ThreadsPage />} />
          <Route path="/threads/:id" element={<DetailThreadPage />} />
          <Route
            path="/new"
            element={authUser ? <CreateThreadPage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
