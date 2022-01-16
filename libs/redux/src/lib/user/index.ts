import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { IUser, IUserState } from './types';

const initialState: IUserState = {
  user: undefined,
  username: undefined,
};

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
  },
});

export const { setUser, setUsername } = userSlice.actions;

export const userReducer = userSlice.reducer;
