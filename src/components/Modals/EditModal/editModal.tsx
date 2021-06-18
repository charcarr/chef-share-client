import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "node-uuid";

import { change_name, add_note, delete_note } from "../../../state/actions";
import { deleteNote, addNote, nameChange } from "../../../services/apiService";
import styles from "./editModal.module.css";

interface State {
  email: string;
  password: string;
}

const EditModal: React.FC = ({ show, handleClose, recipe }) => {

  // display states
  const [notes, setNotes] = useState<State>(recipe.notes);
  const [editMode, setEditMode] = useState<boolean>(false);
  // form management
  const [nameInput, setNameInput] = useState<State>(recipe.name);
  const [noteInput, setNoteInput] = useState("");

  const dispatch = useDispatch();

  // title change
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setNameInput(target.value);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (nameInput !== recipe.name) {
        await nameChange(recipe.id, nameInput);
        dispatch(change_name(recipe.id, nameInput));
      }
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  // adding notes
  const handleNoteChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setNoteInput(target.value);
  };
  const handleNoteSubmit: React.FormEventHandler<HTMLFormElement>  = async (e) => {
    e.preventDefault();
    setEditMode(false);

    if (noteInput) {
      const newNote = {id: uuid.v4(), text: noteInput}
      try {
        await addNote(recipe.id, newNote);
        setNotes((oldNotes) => [...oldNotes, newNote]);
        dispatch(add_note(recipe.id, newNote));
        setNoteInput("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDelete:  = async (e) => {
    const noteId = e.target.id;
    try {
      await deleteNote(recipe.id, noteId);
      dispatch(delete_note(recipe.id, noteId));
      setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={show ? styles.modalShow : styles.modalHide}>

      <form onSubmit={handleSubmit}>
        <div className={styles.buttons}>
          <div
            onClick={handleClose}
            className={styles.button__close}
            aria-hidden="true"
          >
            x
          </div>
          <button type="submit">save</button>
        </div>
        <input
          value={nameInput}
          onChange={handleChange}
          className={styles.input__title}
        />
      </form>

      <div className={styles.heading__notes}>Notes</div>
      <div
        className={styles.button__addNote}
        onClick={() => setEditMode(!editMode)}
        aria-hidden="true"
      >
        edit your notes!
      </div>
      {editMode ? (  <>
                <form className={styles.form__addNotes} onSubmit={handleNoteSubmit}>
                  <input
                    className={styles.input__note}
                    value={noteInput}
                    onChange={handleNoteChange}
                  />
                  <button className={styles.button__saveNote} type="submit">
                    <span aria-hidden="true">📩</span>
                  </button>
                </form>

                {
                  notes.map((note, index) => (
                    <div key={index} className={styles.delete__container}>
                      <button id={note.id} onClick={handleDelete}>x</button>
                      <p>{note.text}</p>
                    </div>
                  ))
                }
        </>
      ) :
      <ul>
        {
          notes.map((note, index) => (
            <li key={index} className={styles.note}>{note.text}</li>
          ))
        }
      </ul>
    }


    </div>
  );
};

export default EditModal;
