// const BASE_URL = "https://chef-share-server.herokuapp.com";
const BASE_URL = "http://localhost:3001"

interface authBody {
  email?: string;
  password?: string;
  username?: string;
  url?: string;
  recipe?: recipe;
  id?: string;
  payload?: string | recipeNote;
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

export const authPost = (route: string, body: authBody) => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL+route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify(body)
  })
}

export const noAuthPost = (route: string, body: authBody) => {
  return fetch(BASE_URL+route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export const authGet = (route: string) => {
  let token = localStorage.getItem('accessToken');
  if (route === '/logout') localStorage.removeItem('accessToken');
  return fetch(BASE_URL+route, {
    headers: {
      'Authorization': `Bearer: ${token}`
    }
  });
}


// auth
export const attemptLogin = (login: authBody) => {
  return noAuthPost('/login', login);
};

export const attemptSignup = (signup: authBody) => {
  return noAuthPost('/signup', signup);
};

export const logout = () => {
  return authGet('/logout');
};

export const fetchProfileData = () => {
  return authGet('/profile');
}


// scraping
export const scrapeRecipe = (url: string) => {
  const body = {url};
  return authPost('/scrape', body);
}


// friends
export const getFriends = () => {
  return authGet('/users')
}

export const getFriendStore = (username: string) => {
  const body = {username};
  return authPost('/getFriendStore', body);
}

export const addFromFriend = (recipe: recipe) => {
  const body = {recipe};
  return authPost('/addFromFriend', body);
}


// edits
//id's are UUID's
export const deleteRecipe = (id: string) => {
  const body = {id}
  return authPost('/deleteRecipe', body);
}

// Does not need to be exported, only used in this file
const editRecipe = (id: string, payload: string | recipeNote, editAction: string) => {
  const body = {id, payload};
  return authPost(`/editRecipe/${editAction}`, body);
}

export const nameChange = (id: string, name: string) => {
  editRecipe(id, name, 'nameChange');
};

export const addNote = (id: string, note: recipeNote) => {
  editRecipe(id, note, 'addNote');
}

// noteId is also a UUID
export const deleteNote = (id: string, noteId: string) => {
  editRecipe(id, noteId, 'deleteNote');
}