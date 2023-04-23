import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import { commentService } from "../services/commentsService";

interface CommentsState {
  comments: any[];
  loading: boolean;
}

// Thunk to fetch post comments from the API
export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: string, thunkAPI) => {
    try {
      const response = await commentService.getComments(postId);
      return response.data;
    }
    catch (error) {
      let message = '';
      if (error instanceof Error) {
        message = error.message || error.toString();
      }
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// Slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
  } as CommentsState,
  reducers: {
    clearComments: (state) => {
      return { comments: [], loading: false };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      // if comments exist add new comments to the existing comments
      if (state.comments.length > 0) {
        const data: Record<string, any[]> = {[action.meta.arg]: action.payload};
        state.comments = [...state.comments, data];
      }
      else {
        state.comments = action.payload;
      }

      state.loading = false;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.loading = false;
    });
  }
});

const { actions, reducer } = commentsSlice;
export default reducer;
export const { clearComments } = actions;
export const selectComments = (state: any) => state.comments.comments;