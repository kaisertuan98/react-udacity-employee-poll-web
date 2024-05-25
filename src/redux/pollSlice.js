import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPolls } from './utils/pollAPI';
import { ANSWER_OPTION } from '../constants/constant';
import { checkIfAnswered } from './utils/common';
import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

const initialState = {
  loading: false,
  polls: [],
};

export const getAllPolls = createAsyncThunk('polls/fetchPoll', async () => await fetchPolls());
export const handleSubmitAnswer = createAsyncThunk(
  'polls/handleSubmitAnswer',
  async ({ authedUser, qid, answer }) => {
    await _saveQuestionAnswer({ authedUser, qid, answer });

    return { authedUser, qid, answer };
  },
);
export const handleCreateAnswer = createAsyncThunk(
  'polls/handleCreateAnswer',
  async ({ author, optionOneText, optionTwoText }) => {
    const result = await _saveQuestion({ author, optionOneText, optionTwoText });

    return result;
  },
);

const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPolls.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPolls.fulfilled, (state, action) => {
      state.polls = action.payload;
      state.loading = false;
    });
    builder.addCase(handleSubmitAnswer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleSubmitAnswer.fulfilled, (state, action) => {
      let currentVoters = state.polls[action.payload.qid][action.payload.answer].votes;
      if (
        !checkIfAnswered(state.polls[action.payload.qid], action.payload.authedUser) &&
        (action.payload.answer === ANSWER_OPTION.OPTION_FIRST ||
          action.payload.answer === ANSWER_OPTION.OPTION_SECOND)
      ) {
        currentVoters.push(action.payload.authedUser);
      }
      state.loading = false;
    });
    builder.addCase(handleCreateAnswer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleCreateAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.polls[action.payload.id] = action.payload;
    });
    builder.addCase(handleCreateAnswer.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default pollSlice.reducer;
