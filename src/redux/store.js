import { configureStore } from '@reduxjs/toolkit';
import login from './loginSlice'
import users from './userSlice'
import polls from './pollSlice'

export const store = configureStore({
  reducer: {
    login,
    users,
    polls
  },
});
