import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

import {set_is_authenticated, set_not_authenticated} from './actions';
import reduxStore from './store';

const {store, persistor} = reduxStore();

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


const handleAuth = (store: Store) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    store.dispatch(set_is_authenticated());
  } else {
    store.dispatch(set_not_authenticated());
  }
}
const root = ({ element }: { element: ReactNode }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} onBeforeLift={() => handleAuth(store)}>
    { element }
    </PersistGate>
  </Provider>
);

export default root;
