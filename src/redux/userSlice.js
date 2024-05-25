import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './utils/userAPI';
import { handleCreateAnswer, handleSubmitAnswer } from './pollSlice';

const initialState = {
  loading: false,
  users: [],
};

export const getAllUsers = createAsyncThunk('users/fetchUser', async () => await fetchUsers());

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(handleSubmitAnswer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleSubmitAnswer.fulfilled, (state, action) => {
      state.users[action.payload.authedUser].answers[action.payload.qid] = action.payload.answer;
      state.loading = false;
    });
    builder.addCase(handleCreateAnswer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleCreateAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.users[action.payload.author].questions.push(action.payload.id);
    });
    builder.addCase(handleCreateAnswer.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
