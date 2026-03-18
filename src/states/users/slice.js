import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

const asyncGetUsers = createAsyncThunk(
  'users/get',
  async () => {
    const users = await api.getAllUsers();
    return users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetUsers.fulfilled, (state, action) => action.payload);
  },
});

export { asyncGetUsers };
export default usersSlice.reducer;
