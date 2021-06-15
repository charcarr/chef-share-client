import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { useDispatch } from "react-redux";

import { attemptLogin } from "../../../services/apiService";
import { set_is_authenticated } from "../../../state/actions";
import logo from "../../../images/bighat.png";
import * as styles from "./login.module.css";


const initialState = {
  email: '',
  password: ''
}

const Login = () => {

  const [login, setLogin] = useState(initialState);
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();


  const handleLogin = ({target}) => {
    setLogin(oldLogin => ({...oldLogin, [target.name]:target.value}))
    setLoginError(false);
  };

  const validateForm = () => {
    return !login.email || !login.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await attemptLogin(login);
    if (response.ok) {
      dispatch(set_is_authenticated());
      let json = await response.json();
      localStorage.setItem('accessToken', json.accessToken);
      setLogin(initialState);
      navigate('/profile');

    } else {
      setLoginError(true);
    }
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

        {loginError ? (
          <p className={styles.errorText}>user name or password is invalid</p>
        ) : null}

        <button type="submit" disabled={validateForm()}>
          login
        </button>

        <Link to="/signup" className={styles.linkText}>
          click here to sign up
        </Link>
      </form>
    </div>
  );
};

export default Login;
