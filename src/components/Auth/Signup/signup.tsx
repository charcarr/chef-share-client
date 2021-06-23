import React, { ChangeEventHandler, useState } from "react";
import { Link, navigate } from "gatsby";
import { useDispatch } from "react-redux";
import { trackPromise } from "react-promise-tracker";

import LoadingInd from "../../LoadingInd/loadingInd";
import { attemptSignup } from "../../../services/apiService";
import { set_is_authenticated } from "../../../state/actions";
import logo from "../../../images/bighat.png";
import * as styles from "./signup.module.css";

interface State {
  email: string;
  password: string;
  username: string;
}

interface authResponse extends Response {
  locals: {
    accessToken: string;
  }
}

const initialState: State = {
  email: "",
  password: "",
  username: "",
};

const Signup: React.FC = () => {
  const [signup, setSignup] = useState<State>(initialState);
  const [signupError, setSignupError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const dispatch = useDispatch();

  const handleLogin: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setSignup((oldSignup: State) => ({ ...oldSignup, [target.name]: target.value }));
    setSignupError(false);
  };
  const validateForm = () => {
    return !signup.email || !signup.password || !signup.username;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    trackPromise(attemptSignup(signup)
    .then<authResponse>(res => res.json())
    .then((res: authResponse) => {
      dispatch(set_is_authenticated());
      localStorage.setItem('accessToken', res.locals.accessToken);
      setSignup(initialState);
      navigate('/profile');
    })
    .catch((err: string) => {
      setErrorText('This email or username is already in use');
      setSignupError(true);
    }));
  };

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="logo" />
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <p className={styles.title}>chef signup</p>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={signup.email}
          onChange={handleLogin}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={signup.password}
          onChange={handleLogin}
        />
        <input
          name="username"
          placeholder="username"
          value={signup.username}
          onChange={handleLogin}
        />
        <LoadingInd />
        {signupError ? <p className={styles.errorText}>{errorText}</p> : null}

        <button type="submit" disabled={validateForm()}>
          signup
        </button>

        <Link to="/" className={styles.linkText} data-testid="loginLink">
          click here to login
        </Link>
      </form>
    </div>
  );
};

export default Signup;
