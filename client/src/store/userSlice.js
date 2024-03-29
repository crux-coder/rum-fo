/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('user') || null,
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || '',
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    storedUser: (state, action) => {
      state.user = action.payload;
    },
    storedAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    storedRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

export const { storedUser, storedAccessToken, storedRefreshToken } = userSlice.actions;

export default userSlice.reducer;
