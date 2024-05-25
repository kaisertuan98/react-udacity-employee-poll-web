/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../views/pages/Login';
import { store } from '../redux/store';


describe('Login Component', () => {
  let component;

  beforeEach(() => {

    // eslint-disable-next-line testing-library/no-render-in-setup
    component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
  });

  it('renders the login form correctly', () => {
    const { getByTestId } = component;

    expect(getByTestId('submit-btn')).toBeInTheDocument();
    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
  });

  it('submits the form with valid credentials', async () => {
    const { getByTestId } = component;

    fireEvent.change(getByTestId('username').querySelector('input'), {
      target: { value: 'sarahedo' },
    });
    fireEvent.change(getByTestId('password').querySelector('input'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(getByTestId('submit-btn'));

    // Mocking successful login API response
    await waitFor(() => expect(store.getState().login.authedUser).toEqual('sarahedo'));
  });

  it('displays error message for invalid credentials', async () => {
    const { getByTestId, findByText } = component;

    fireEvent.change(getByTestId('username').querySelector('input'), { target: { value: 'invaliduser' } });
    fireEvent.change(getByTestId('password').querySelector('input'), { target: { value: 'invalidpassword' } });

    fireEvent.submit(getByTestId('submit-btn'));

    // Mocking failed login API response
    await findByText('Invalid username or password. Please try again!');
  });
});
