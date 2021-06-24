import React from "react";
import { useSelector } from "react-redux";
import Logout from "../../Auth/Logout/logout";
import logo from "../../../images/smallhat.png";
import * as styles from "./header.module.css";

interface RootState {
  username: string;
  isAuthenticated: boolean;
  recipeStore: recipe[];
}

interface recipeNote {
  id: string;
  text: string;
}

interface recipe {
  id: string;
  name: string;
  keywords: string[];
  image: string;
  recipeYield: string;
  recipeIngredient: string[];
  recipeInstructions: string[];
  publisher: string;
  author: string;
  url: string;
  notes: recipeNote[];
  origin: string;
}

const Header: React.FC = () => {
  const username = useSelector((state: RootState) => state.username);

  return (
    <div className={styles.container}>
      <div className={styles.left__container}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div>
          Welcome back chef <span className={styles.name}>{username}</span>
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default Header;
