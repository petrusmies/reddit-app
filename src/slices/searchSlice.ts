import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchService } from '../services/searchService';
import { setMessage } from './messageSlice';

interface SearchState {
  posts: any[] | null;
  loading: boolean;
}

// Thunk to fetch search results from the API
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query: string, thunkAPI) => {
    try {
      console.log(query);
      const response = await searchService.searchPosts(query);
      return response.data.data.children;
    } catch (error) {
      let message = '';
      if (error instanceof Error) {
        message = error.message || error.toString();
      }
      thunkAPI.dispatch(setMessage({ message }));
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    posts: [],
    loading: false,
  } as SearchState,
  reducers: {
    clearPosts: (state) => {
      return { posts: [], loading: false };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false;
      });
  }
});

const { actions, reducer } = searchSlice;
export const { clearPosts } = actions
export default reducer;

export const selectSearchPosts = (state: any) => state.search.posts;
