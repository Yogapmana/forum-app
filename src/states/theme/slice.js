import { createSlice } from '@reduxjs/toolkit';

function getInitialTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialTheme(),
  reducers: {
    toggleTheme(state) {
      const next = state === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
