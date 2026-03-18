import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

const asyncGetLeaderboard = createAsyncThunk(
  'leaderboard/get',
  async () => {
    const leaderboards = await api.getLeaderboard();
    return leaderboards;
  },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: [],
  reducers: {
    setLeaderboard(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetLeaderboard.fulfilled, (state, action) => action.payload);
  },
});

export { asyncGetLeaderboard };
export default leaderboardSlice.reducer;
