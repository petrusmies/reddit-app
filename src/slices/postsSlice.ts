import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './messageSlice';
import { postsService } from '../services/postsService';

// Initial state interface
interface PostsState {
  posts: any;
  loading: boolean;
}

// Thunk to fetch posts from the API
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (__, thunkAPI) => {
    try {
      const response = await postsService.getPopularPosts();
      return response.data.data.children;
    }
    catch (error) {
      let message = '';

      if (error instanceof Error) {
        message = error.message || error.toString();
      }
      
      thunkAPI.dispatch(setMessage({ message }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
  } as PostsState,
  reducers: {
    clearPosts: (state) => {
      return { posts: [], loading: false };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
      })
  }
});

const { actions, reducer } = postsSlice;
export default reducer;
export const { clearPosts } = actions;

// Posts selector
export const selectPosts = (state: any) => state.posts.posts;
export const selectLoading = (state: any) => state.posts.loading;
