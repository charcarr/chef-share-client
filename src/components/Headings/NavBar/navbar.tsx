import { Link } from "gatsby";
import React from "react";
import styles from "./navbar.module.css";

const NavBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navElement}>
        <Link className={styles.text} to="/recipes">
          my recipes
        </Link>
      </div>
      <div className={styles.navElement}>
        <Link className={styles.text} to="/profile">
          home
        </Link>
      </div>
      <div className={styles.navElement}>
        <Link className={styles.text} to="/visitFriends">
          visit friends
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
