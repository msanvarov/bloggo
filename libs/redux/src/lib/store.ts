import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { layoutReducer } from './layout';
import { userReducer } from './user';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['user'],
};

const reducer = combineReducers({
  user: userReducer,
  layout: layoutReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //   .concat(routerMiddleware(history))
  devTools: true,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
// top-level state
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
