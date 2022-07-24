import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonSlice from './common/slice';

const rootReducer = combineReducers({
  common: commonSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
