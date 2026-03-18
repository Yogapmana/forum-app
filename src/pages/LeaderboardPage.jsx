import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetLeaderboard } from '../states/leaderboard/slice';
import LeaderboardItem from '../components/LeaderboardItem';
import LoadingBar from '../components/LoadingBar';

function LeaderboardPage() {
  const leaderboard = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(asyncGetLeaderboard());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <LoadingBar loading={loading} />
      <h1 className="text-2xl font-bold text-primary dark:text-white mb-6">Leaderboard</h1>

      {loading ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">Memuat leaderboard...</div>
      ) : (
        <div className="space-y-3">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">Belum ada data.</div>
          ) : (
            leaderboard.map((item, index) => (
              <LeaderboardItem
                key={item.user.id}
                user={item.user}
                score={item.score}
                rank={index + 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
