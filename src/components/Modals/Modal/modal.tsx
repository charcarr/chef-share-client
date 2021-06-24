import React, { useState } from "react";
import { Link } from "gatsby";
import * as styles from "./modal.module.css";
import { trackPromise } from "react-promise-tracker";

import LoadingInd from "../../LoadingInd/loadingInd";
import { scrapeRecipe } from "../../../services/apiService";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const Modal: React.FC<Props> = ({ show, handleClose }) => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);


  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setUrl(target.value);
    setError(false);
    setSuccess(false);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement>  = async (e) => {
    e.preventDefault();
    trackPromise(
      scrapeRecipe(url)
        .then((res) => {
          if (res.ok) {
            setUrl("");
            setSuccess(true);
            setError(false);
          } else {
            setError(true);
            setSuccess(false);
          }
        })
    );
  };

  return (
    <div className={show ? styles.modalShow : styles.modalHide}>
      <div className={styles.modalMain}>
        <p className={styles.text__header}>Add your url</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="url"
            value={url}
            onChange={handleChange}
            className={styles.input}
          />
          <LoadingInd color="lightgrey" />
          {success ? (
            <div className={styles.text__success}>
              succcess! take me to <Link to="/recipes">my recipes</Link>
            </div>
          ) : null}
          {error ? (
            <p className={styles.text__error}>
              unable to import, please try another website
            </p>
          ) : null}

          <button type="submit" disabled={!url}>
            submit
          </button>
        </form>

        <button onClick={handleClose} className={styles.close}>
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
