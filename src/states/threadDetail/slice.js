import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

const asyncGetThreadDetail = createAsyncThunk(
  'threadDetail/get',
  async (threadId) => {
    const detail = await api.getThreadDetail(threadId);
    return detail;
  },
);

const asyncCreateComment = createAsyncThunk(
  'threadDetail/createComment',
  async ({ threadId, content }) => {
    const comment = await api.createComment({ threadId, content });
    return comment;
  },
);

const asyncToggleVoteThreadDetail = createAsyncThunk(
  'threadDetail/toggleVoteThread',
  async ({ threadId, voteType, userId }, { dispatch }) => {
    dispatch(toggleVoteThreadDetail({ voteType, userId }));
    try {
      if (voteType === 'up-vote') {
        await api.upVoteThread(threadId);
      } else if (voteType === 'down-vote') {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
      }
    } catch {
      dispatch(toggleVoteThreadDetail({ voteType: 'neutral', userId }));
    }
  },
);

const asyncToggleVoteComment = createAsyncThunk(
  'threadDetail/toggleVoteComment',
  async ({
    threadId, commentId, voteType, userId,
  }, { dispatch }) => {
    dispatch(toggleVoteCommentDetail({ commentId, voteType, userId }));
    try {
      if (voteType === 'up-vote') {
        await api.upVoteComment(threadId, commentId);
      } else if (voteType === 'down-vote') {
        await api.downVoteComment(threadId, commentId);
      } else {
        await api.neutralVoteComment(threadId, commentId);
      }
    } catch {
      dispatch(toggleVoteCommentDetail({ commentId, voteType: 'neutral', userId }));
    }
  },
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    setThreadDetail(state, action) {
      return action.payload;
    },
    clearThreadDetail() {
      return null;
    },
    toggleVoteThreadDetail(state, action) {
      if (!state) return state;
      const { voteType, userId } = action.payload;
      const upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      const downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      if (voteType === 'up-vote') {
        upVotesBy.push(userId);
      } else if (voteType === 'down-vote') {
        downVotesBy.push(userId);
      }
      return { ...state, upVotesBy, downVotesBy };
    },
    toggleVoteCommentDetail(state, action) {
      if (!state) return state;
      const { commentId, voteType, userId } = action.payload;
      const comments = state.comments.map((comment) => {
        if (comment.id !== commentId) return comment;
        const upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        const downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
        if (voteType === 'up-vote') {
          upVotesBy.push(userId);
        } else if (voteType === 'down-vote') {
          downVotesBy.push(userId);
        }
        return { ...comment, upVotesBy, downVotesBy };
      });
      return { ...state, comments };
    },
    addComment(state, action) {
      if (!state) return state;
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetThreadDetail.fulfilled, (state, action) => action.payload)
      .addCase(asyncCreateComment.fulfilled, (state, action) => {
        if (!state) return state;
        return {
          ...state,
          comments: [action.payload, ...state.comments],
        };
      });
  },
});

const {
  clearThreadDetail,
  toggleVoteThreadDetail,
  toggleVoteCommentDetail,
} = threadDetailSlice.actions;

export {
  asyncGetThreadDetail,
  asyncCreateComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
  clearThreadDetail,
};
export default threadDetailSlice.reducer;
