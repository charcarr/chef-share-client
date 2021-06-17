// const BASE_URL = "https://chef-share-server.herokuapp.com";
const BASE_URL = "http://localhost:3001"


export const authPost = (route, body) => {
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

export const noAuthPost = (route, body) => {
  return fetch(BASE_URL+route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export const authGet = (route) => {
  let token = localStorage.getItem('accessToken');
  if (route === '/logout') localStorage.removeItem('accessToken');
  return fetch(BASE_URL+route, {
    headers: {
      'Authorization': `Bearer: ${token}`
    }
  });
}


// auth
export const attemptLogin = (login) => {
  return noAuthPost('/login', login);
};

export const attemptSignup = (signup) => {
  return noAuthPost('/signup', signup);
};

export const logout = () => {
  return authGet('/logout');
};

export const fetchProfileData = () => {
  return authGet('/profile');
}


// scraping
export const scrapeRecipe = (url) => {
  const body = {url};
  return authPost('/scrape', body);
}


// friends
export const getFriends = () => {
  return authGet('/users')
}

export const getFriendStore = (username) => {
  const body = {username};
  return authPost('/getFriendStore', body);
}

export const addFromFriend = (recipe) => {
  const body = {recipe};
  return authPost('/addFromFriend', body);
}


// edits
export const deleteRecipe = (id) => {
  const body = {id}
  return authPost('/deleteRecipe', body);
}

export const editRecipe = (id, payload, editAction) => {
  const body = {id, payload};
  return authPost(`/editRecipe/${editAction}`, body);
}

export const nameChange = (id, name) => {
  editRecipe(id, name, 'nameChange');
};

export const addNote = (id, note) => {
  editRecipe(id, note, 'addNote');
}

export const deleteNote = (id, noteId) => {
  editRecipe(id, noteId, 'deleteNote');
}