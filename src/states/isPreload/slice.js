import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';
import { setAuthUser } from '../authUser/slice';

const asyncPreloadProcess = createAsyncThunk(
  'isPreload/preload',
  async (_, { dispatch }) => {
    try {
      const user = await api.getOwnProfile();
      dispatch(setAuthUser(user));
    } catch {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
  },
);

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setIsPreload(state, action) {
      return action.payload;
    },
  },
});

const { setIsPreload } = isPreloadSlice.actions;
export { asyncPreloadProcess };
export default isPreloadSlice.reducer;
