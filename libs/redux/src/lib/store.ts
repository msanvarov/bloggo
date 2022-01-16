import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { userReducer } from './user';

const reducer = {
  user: userReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  //   .concat(routerMiddleware(history))
  devTools: true,
});

setupListeners(store.dispatch);

// top-level state
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
