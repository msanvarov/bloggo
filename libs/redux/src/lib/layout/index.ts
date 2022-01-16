import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

const layoutSlice = createSlice({
  name: '@@layout',
  initialState,
  reducers: {
    toggleDarkMode: (state) => ({ darkMode: !state.darkMode }),
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode, toggleDarkMode } = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
