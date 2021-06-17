

export const set_is_authenticated = () => ({
  type: "SET_IS_AUTHENTICATED"
});

export const logout_user = () => ({
  type: "LOGOUT_USER"
});

export const set_not_authenticated = () => ({
  type: "SET_NOT_AUTHENTICATED"
});



export const set_username = (username) => ({
  type: "SET_USERNAME",
  payload: username
});



export const rewrite_store = (store) => ({
  type: "REWRITE_STORE",
  payload: store
});

export const add_item = (recipe) => ({
  type: "ADD_ITEM",
  recipe
})

export const delete_item = (id) => ({
  type: "DELETE_ITEM",
  payload: id
});

export const change_name = (id, name) => ({
  type: "CHANGE_NAME",
  id,
  name
});

export const add_note = (id, note) => ({
  type: "ADD_NOTE",
  id,
  note
})

export const delete_note = (recipeId, noteId) => ({
  type: "DELETE_NOTE",
  recipeId,
  noteId
})