import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from '../states/authUser/slice';
import isPreloadReducer from '../states/isPreload/slice';
import threadsReducer from '../states/threads/slice';
import threadDetailReducer from '../states/threadDetail/slice';
import usersReducer from '../states/users/slice';
import leaderboardReducer from '../states/leaderboard/slice';
import themeReducer from '../states/theme/slice';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    leaderboard: leaderboardReducer,
    theme: themeReducer,
  },
});

export default store;
