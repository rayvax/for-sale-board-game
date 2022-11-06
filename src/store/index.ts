import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { proceduresApi } from '../services/sql-procedures/helper';
import account from './account/reducer';

const rootReducer = combineReducers({
  account,
  [proceduresApi.reducerPath]: proceduresApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(proceduresApi.middleware),
  });
};

export type AppState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
export type AppDipatch = AppStore['dispatch'];
