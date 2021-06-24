import React, { useState } from "react";
import Modal from "../Modals/Modal/modal";
import * as styles from "./recipeAdder.module.css";

const RecipeAdder = () => {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const handleModal = () => {
    setModalStatus(!modalStatus);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.addButton}
        onClick={handleModal}
        aria-hidden="true"
      >
        +
      </div>
      <Modal show={modalStatus} handleClose={handleModal}></Modal>
    </div>
  );
};

export default RecipeAdder;
