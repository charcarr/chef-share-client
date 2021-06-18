import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

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

interface Action {
  type: string;
  username: string;
  store: recipe[];
  id: string;
  name: string;
  recipe: recipe;
  note: recipeNote;
  recipeId: string;
  noteId: string;
}
const isAuthenticated = (state: boolean = false, action: Partial<Action>) => {

  switch (action.type) {
    case 'SET_IS_AUTHENTICATED':
      state = true;
      return state;
    case 'SET_NOT_AUTHENTICATED':
      state = false;
      return state;
    case 'LOGOUT_USER':
      storage.removeItem('persist:root');
      return false;
    default: return state;
  }

};

const username = (state: string = 'nobody', action: Action) => {
  switch (action.type) {
  case 'SET_USERNAME':
    state = action.username;
    return state;
  default: return state;
  }
};

const recipeStore = (state: recipe[] = [], action: Action) => {
  switch (action.type) {

    case 'REWRITE_STORE':
      state = [...action.store];
      return state;

    case 'DELETE_ITEM':
      return state.filter(item => item.id !== action.id);

    case 'ADD_ITEM':
      return [...state, action.recipe]

    case 'CHANGE_NAME':
      state.forEach((recipe) => {
        if (recipe.id === action.id) recipe.name = action.name;
      })
      return [...state];

    case 'ADD_NOTE':
      state.forEach((recipe) => {
        if (recipe.id === action.id) recipe.notes.push(action.note);
      })
      return [...state];

    case 'DELETE_NOTE':
      state.forEach((recipe) => {
        if (recipe.id === action.recipeId) {
          const filtered = recipe.notes.filter(note => note.id !== action.noteId)
          recipe.notes = filtered;
        }
      })
      return [...state]

    default: return state;
  }
}


const appReducer = combineReducers({
  isAuthenticated,
  username,
  recipeStore
});

// Cannot have a state of undefined, moved storage.removeItem to
// LOGOUT_USER case in isAuthenticated reducer
// const rootReducer = (state: RootState, action: Action) => {
//   if (action.type === 'LOGOUT_USER') {
//     storage.removeItem('persist:root');
//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// }


export default appReducer;