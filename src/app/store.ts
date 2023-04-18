import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import postsReducer from '../slices/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
