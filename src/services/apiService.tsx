
const BASE_URL = "https://chef-share-server.herokuapp.com";
//const BASE_URL = "http://localhost:3000"


const authPost = (route, body) => {
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

const noAuthPost = (route, body) => {
  return fetch(BASE_URL+route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

const authGet = (route) => {
  let token = localStorage.getItem('accessToken');
  if (route === '/logout') localStorage.removeItem('accessToken');
  return fetch(BASE_URL+route, {
    headers: {
      'Authorization': `Bearer: ${token}`
    }
  });
}


// auth
const attemptLogin = (login) => {
  return noAuthPost('/login', login);
};

const attemptSignup = (signup) => {
  return noAuthPost('/signup', signup);
};

const logout = () => {
  return authGet('/logout');
};

const fetchProfileData = () => {
  return authGet('/profile');
}


// scraping
const scrapeRecipe = (url) => {
  const body = {url};
  return authPost('/scrape', body);
}


// friends
const getFriends = () => {
  return authGet('/users')
}

const getFriendStore = (username) => {
  const body = {username};
  return authPost('/getFriendStore', body);
}

const addFromFriend = (recipe) => {
  const body = {recipe};
  return authPost('/addFromFriend', body);
}


// edits
const deleteRecipe = (id) => {
  const body = {id}
  return authPost('/deleteRecipe', body);
}

const editRecipe = (id, payload, editAction) => {
  const body = {id, payload};
  return authPost(`/editRecipe/${editAction}`, body);
}

const nameChange = (id, name) => {
  editRecipe(id, name, 'nameChange');
};

const addNote = (id, note) => {
  editRecipe(id, note, 'addNote');
}

const deleteNote = (id, noteId) => {
  editRecipe(id, noteId, 'deleteNote');
}



module.exports = {
  attemptLogin, attemptSignup, logout, fetchProfileData,
  scrapeRecipe, deleteRecipe, nameChange, addNote, deleteNote,
  getFriends, getFriendStore, addFromFriend
}