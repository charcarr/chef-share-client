import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ReduxWrapper from '../../../state/ReduxWrapper';
import Login from './login';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Login page', () => {

  it('should call onSubmit handler for valid form submission', () => {
    const { getByPlaceholderText } = render(<Login />, { wrapper: ({ children }) => <ReduxWrapper element={children} /> });

    const loginUser = {
      email: 'test@email.com',
      password: 'password',
    }
    const onSubmitSpy = jest.fn();

    waitFor(() => {
      const emailInput = getByPlaceholderText('email');
      const passwordInput = getByPlaceholderText('password');

      fireEvent.change(emailInput, loginUser.email);
      fireEvent.change(passwordInput, loginUser.password);

      const wrapper = shallow(<Login />);
      wrapper.find('form').simulate('submit', { onsubmit: onSubmitSpy });

      expect(onSubmitSpy).toHaveBeenCalledWith(loginUser);
    });
  });
});