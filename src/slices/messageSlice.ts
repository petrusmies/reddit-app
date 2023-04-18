import { createSlice } from '@reduxjs/toolkit';


// Slice
const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: ''
  },
  reducers: {
    setMessage: (state, action) => {
      return state = action.payload;
    },
    clearMessage: (state) => {
      return { message: ''}
    }
  },
});

const { actions, reducer } = messageSlice;
export default reducer;
export const { setMessage, clearMessage } = actions;


// message selector
export const selectMessage = (state: any) => state.message.message;