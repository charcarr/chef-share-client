import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ReduxWrapper from '../../../state/ReduxWrapper';
import Signup from './signup';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Signup page', () => {
  it('contains a greeting', () => {
    const { getByText } = render(<Signup />, { wrapper: ({ children }) => <ReduxWrapper element={children} /> });

    waitFor(() => {
      getByText('chef signup');
    });
  });

  it('should call onSubmit handler for valid form submission', () => {
    const { getByPlaceholderText } = render(<Signup />, { wrapper: ({ children }) => <ReduxWrapper element={children} /> });

    const newUser = {
      email: 'test@email.com',
      password: 'password',
      username: 'test'
    }
    const onSubmitSpy = jest.fn();

    waitFor(() => {
      const emailInput = getByPlaceholderText('email');
      const passwordInput = getByPlaceholderText('password');
      const usernameInput = getByPlaceholderText('username');

      fireEvent.change(emailInput, newUser.email);
      fireEvent.change(passwordInput, newUser.password);
      fireEvent.change(usernameInput, newUser.username);

      const wrapper = shallow(<Signup />);
      wrapper.find('form').simulate('submit', { onsubmit: onSubmitSpy });

      expect(onSubmitSpy).toHaveBeenCalledWith(newUser);
    });
  });
});