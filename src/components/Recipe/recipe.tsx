import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";

import { delete_item, add_item } from "../../state/actions";
import { deleteRecipe, addFromFriend } from "../../services/apiService";
import RecipeModal from "../Modals/RecipeModal/recipeModal";
import EditModal from "../Modals/EditModal/editModal";
import styles from "./recipe.module.css";

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

interface Props {
  recipe: recipe;
  remove: boolean;
  edit: boolean;
  save: boolean;
  self: boolean;
}

const Recipe = ({ recipe, remove, edit, save, self}: Props) => {
  const [inFocus, setInFocus] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const me = useSelector((state: RootState) => state.username);
  const dispatch = useDispatch();

  const handleModal = () => {
    setModalStatus(!modalStatus);
  };
  const handleEditModal = () => {
    setEditModalStatus(!editModalStatus)
  }

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipe.id);
      dispatch(delete_item(recipe.id));
      setSaved(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async () => {
    try {
      await addFromFriend(recipe);
      dispatch(add_item(recipe));
      setSaved(true);
    } catch (e) {
      console.log(e);
    }
  }

  let keywordString = "";
  if (recipe.keywords) {
    keywordString = recipe.keywords.join(", ");
  }

  return (
    <>
      <div
        className={styles.container}
        onMouseEnter={() => setInFocus(true)}
        onMouseLeave={() => setInFocus(false)}
        aria-hidden="true"
      >
        {recipe.image && (
          <img src={recipe.image} className={styles.image} alt="recipe" />
        )}
        {!recipe.image && <div className={styles.noImage}></div>}

        <div
          className={styles.detailsBox}
          onClick={handleModal}
          aria-hidden="true"
        >
          <div>
            <div className={styles.details__name}>{recipe.name}</div>
            {self ? (
              <>
                {recipe.origin === me ? null : (
                  <div className={styles.details__origin}>
                    {`from chef ${recipe.origin}`}
                  </div>
                )}
              </>
            ) : null}
            <div className={styles.details__author}>{recipe.publisher}</div>
            <div className={styles.details__author}>{recipe.author}</div>
          </div>
          <div className={styles.details__keywords}>{keywordString}</div>
        </div>

        <div className={styles.buttons}>
          {remove ? (
            <div
              className={inFocus ? styles.button__show : styles.button__hide}
              onClick={handleDelete}
              aria-hidden="true"
            >
              x
            </div>
          ) : null}
          {edit ? (
            <div
              className={
                inFocus ? styles.editButton__show : styles.editButton__hide
              }
              onClick={handleEditModal}
              aria-hidden="true"
            >
              <BsPencil />
            </div>
          ) : null}
          {save ? (
            <div
              className={inFocus ? styles.button__show : styles.button__hide}
              onClick={saved ? handleDelete : handleSave}
              aria-hidden="true"
            >
              {saved ? "x" : "+"}
            </div>
          ) : null}
        </div>
      </div>
      <RecipeModal
        show={modalStatus}
        handleClose={handleModal}
        recipe={recipe}
      />
      <EditModal
        show={editModalStatus}
        handleClose={handleEditModal}
        recipe={recipe}
      />
    </>
  );
};

export default Recipe;
