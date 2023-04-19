import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import postsReducer from '../slices/postsSlice';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  posts: postsReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
