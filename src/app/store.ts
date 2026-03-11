import { configureStore } from '@reduxjs/toolkit';
import movieoReducer from './movieoSlice';

export const store = configureStore({
  reducer: {
    movieo: movieoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
