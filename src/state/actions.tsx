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

export const set_is_authenticated = () => ({
  type: "SET_IS_AUTHENTICATED"
});

export const logout_user = () => ({
  type: "LOGOUT_USER"
});

export const set_not_authenticated = () => ({
  type: "SET_NOT_AUTHENTICATED"
});



export const set_username = (username: string) => ({
  type: "SET_USERNAME",
  username
});



export const rewrite_store = (store: recipe[]) => ({
  type: "REWRITE_STORE",
  store
});

export const add_item = (recipe: recipe) => ({
  type: "ADD_ITEM",
  recipe
})

export const delete_item = (id: string) => ({
  type: "DELETE_ITEM",
  id
});

export const change_name = (id: string, name: string) => ({
  type: "CHANGE_NAME",
  id,
  name
});

export const add_note = (id: string, note: recipeNote) => ({
  type: "ADD_NOTE",
  id,
  note
})

export const delete_note = (recipeId: string, noteId: string) => ({
  type: "DELETE_NOTE",
  recipeId,
  noteId
})