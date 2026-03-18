import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

const asyncSetAuthUser = createAsyncThunk(
  'authUser/set',
  async ({ email, password }, { dispatch }) => {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const user = await api.getOwnProfile();
    dispatch(setAuthUser(user));
  },
);

const asyncUnsetAuthUser = createAsyncThunk(
  'authUser/unset',
  async (_, { dispatch }) => {
    api.putAccessToken('');
    dispatch(unsetAuthUser());
  },
);

const asyncRegisterUser = createAsyncThunk(
  'authUser/register',
  async ({ name, email, password }) => {
    await api.register({ name, email, password });
  },
);

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser(state, action) {
      return action.payload;
    },
    unsetAuthUser() {
      return null;
    },
  },
});

const { setAuthUser, unsetAuthUser } = authUserSlice.actions;
export {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
  setAuthUser,
};
export default authUserSlice.reducer;
