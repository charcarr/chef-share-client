import React from "react";
import { navigate } from "gatsby";
import { useDispatch } from "react-redux";

import { logout_user } from "../../../state/actions";
import { logout } from "../../../services/apiService";
import * as styles from "./logout.module.css";

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout: React.FormEventHandler<HTMLDivElement> = async () => {
    try {
      await logout();
      dispatch(logout_user());
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div onClick={handleLogout} aria-hidden="true" className={styles.logout}>
      logout
    </div>
  );
};

export default Logout;
