import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

const asyncGetThreads = createAsyncThunk(
  'threads/get',
  async () => {
    const threads = await api.getAllThreads();
    return threads;
  },
);

const asyncCreateThread = createAsyncThunk(
  'threads/create',
  async ({ title, body, category }) => {
    const thread = await api.createThread({ title, body, category });
    return thread;
  },
);

const asyncToggleVoteThreadList = createAsyncThunk(
  'threads/toggleVote',
  async ({ threadId, voteType, userId }, { dispatch }) => {
    dispatch(toggleVoteThread({ threadId, voteType, userId }));
    try {
      if (voteType === 'up-vote') {
        await api.upVoteThread(threadId);
      } else if (voteType === 'down-vote') {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
      }
    } catch {
      dispatch(toggleVoteThread({ threadId, voteType: 'neutral', userId }));
    }
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    setThreads(state, action) {
      return action.payload;
    },
    toggleVoteThread(state, action) {
      const { threadId, voteType, userId } = action.payload;
      return state.map((thread) => {
        if (thread.id !== threadId) return thread;
        const upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        const downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        if (voteType === 'up-vote') {
          upVotesBy.push(userId);
        } else if (voteType === 'down-vote') {
          downVotesBy.push(userId);
        }
        return { ...thread, upVotesBy, downVotesBy };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetThreads.fulfilled, (state, action) => action.payload);
  },
});

const { toggleVoteThread } = threadsSlice.actions;
export { asyncGetThreads, asyncCreateThread, asyncToggleVoteThreadList };
export default threadsSlice.reducer;
