import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetThreads } from '../states/threads/slice';
import { asyncGetUsers } from '../states/users/slice';
import ThreadCard from '../components/ThreadCard';
import CategoryFilter from '../components/CategoryFilter';
import LoadingBar from '../components/LoadingBar';

function ThreadsPage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(asyncGetThreads()),
        dispatch(asyncGetUsers()),
      ]);
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const categories = useMemo(
    () => [...new Set(threads.map((t) => t.category).filter(Boolean))],
    [threads],
  );

  const filteredThreads = useMemo(
    () => (selectedCategory
      ? threads.filter((t) => t.category === selectedCategory)
      : threads),
    [threads, selectedCategory],
  );

  const getUserById = (id) => users.find((u) => u.id === id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <LoadingBar loading={loading} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary dark:text-white">Diskusi Terkini</h1>
        {authUser && (
          <Link
            to="/new"
            className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            + Buat Thread
          </Link>
        )}
      </div>

      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">Memuat thread...</div>
      ) : (
        <div className="space-y-4">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">Belum ada thread.</div>
          ) : (
            filteredThreads.map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                owner={getUserById(thread.ownerId)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ThreadsPage;
