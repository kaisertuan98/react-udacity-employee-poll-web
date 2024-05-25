/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, screen, que, queryAllByTextryAllByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Dashboard from '../views/pages/Dashboard';
import { store } from '../redux/store';
import { setLogin } from '../redux/loginSlice';
import { getAllPolls } from '../redux/pollSlice';
import { getAllUsers } from '../redux/userSlice';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Dashboard Component', () => {
  let queryAllByText;
  let getByText;

  beforeEach(async () => {
    await store.dispatch(getAllPolls());
    await store.dispatch(getAllUsers());
    await store.dispatch(setLogin({ id: 'sarahedo' }));
    // eslint-disable-next-line testing-library/no-render-in-setup
    ({ queryAllByText, getByText } = render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>,
    ));
  });

  it('renders tabs correctly', () => {
    expect(getByText('New Question')).toBeInTheDocument();
    expect(getByText('Done')).toBeInTheDocument();
  });

  it('renders New Question tab content correctly', () => {
    fireEvent.click(getByText('New Question'));
    const noAnswerQuestions = Object.keys(store.getState().users.users['sarahedo'].answers).length;
    const noNewQuestions =
      Object.keys(store.getState().polls.polls).length -
      Object.keys(store.getState().users.users['sarahedo'].answers).length;
    expect(queryAllByText('Show').length).toEqual(noNewQuestions);
  });

  it('renders Done tab content correctly', () => {
    fireEvent.click(getByText('Done'));
    const noAnswerQuestions = Object.keys(store.getState().users.users['sarahedo'].answers).length;
    expect(queryAllByText('Show').length).toEqual(noAnswerQuestions);
  });
});
