import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { useDispatch } from "react-redux";
import { trackPromise } from 'react-promise-tracker';

import LoadingInd from "../../LoadingInd/loadingInd";
import { attemptLogin } from "../../../services/apiService";
import { set_is_authenticated } from "../../../state/actions";
import logo from "../../../images/bighat.png";
import * as styles from "./login.module.css";

interface State {
  email: string;
  password: string;
}

interface authResponse extends Response {
  accessToken: string;
}

const initialState: State = {
  email: '',
  password: ''
}

const Login: React.FC = () => {
  const [login, setLogin] = useState<State>(initialState);
  const [loginError, setLoginError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
    setLogin((oldLogin: State) => ({...oldLogin, [target.name]:target.value}))
    setLoginError(false);
  };
  const validateForm = () => {
    return !login.email || !login.password;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    trackPromise(attemptLogin(login)
      .then<authResponse>(res => res.json())
      .then((res: authResponse) => {
        dispatch(set_is_authenticated());
        console.log(res.accessToken);

        localStorage.setItem('accessToken', res.accessToken);
        setLogin(initialState);
        navigate('/profile');
      })
      .catch((err: string) => {
        setLoginError(true);
        console.log(err);
      }));
  };

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="logo" />
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <p className={styles.title}>welcome to chef share</p>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={login.email}
          onChange={handleLogin}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={login.password}
          onChange={handleLogin}
        />
        <LoadingInd />
        {loginError ? (
          <p className={styles.errorText}>user name or password is invalid</p>
        ) : null}

        <button type="submit" disabled={validateForm()}>
          login
        </button>
        <Link to="/signup" className={styles.linkText} data-testid="signupLink">
          click here to sign up
        </Link>
      </form>
    </div>
  );
};

export default Login;
