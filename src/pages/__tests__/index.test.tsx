import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IndexPage from '../index';
import ReduxWrapper from '../../state/ReduxWrapper';

describe('IndexPage', () => {
  it('contains a greeting', () => {
    const { getByText, getByTestId } = render(<IndexPage />, { wrapper: ({ children }) => <ReduxWrapper element={children} /> });

    waitFor(() => {
      getByText('welcome to chef share');
      const signUpLink = getByTestId('signupLink');
      userEvent.click(signUpLink);
    });

    waitFor(() => {
      getByText('chef signup');
      const loginLink = getByTestId('loginLink');
      userEvent.click(loginLink);
    });

    waitFor(() => {
      getByText('welcome to chef share');
    })
  });
});
