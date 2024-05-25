import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.authedUser = action.payload.id;
    },
    removeLogin: (state) => {
      state.authedUser = null;
    }
  },
});

export const { setLogin, removeLogin } = loginSlice.actions;

export const selectLogin = (state) => state?.login?.authedUser;

export default loginSlice.reducer;
