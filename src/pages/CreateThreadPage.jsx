import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateThread } from '../states/threads/slice';

function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(asyncCreateThread({ title, body, category })).unwrap();
      navigate('/');
    } catch {
      // error handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border p-6">
        <h1 className="text-2xl font-bold text-primary dark:text-white mb-6">Buat Thread Baru</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Judul
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
              placeholder="Judul thread"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kategori (opsional)
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
              placeholder="Contoh: react, javascript"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Isi Thread
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition resize-none"
              placeholder="Tulis isi thread di sini..."
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border transition text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Membuat...' : 'Buat Thread'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;
