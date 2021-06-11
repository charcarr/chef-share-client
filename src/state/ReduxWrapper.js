import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import reduxStore from './store';
import {set_is_authenticated, set_not_authenticated} from './actions';

const {store, persistor} = reduxStore();


const handleAuth = (store) => {
  const token = localStorage.getItem('accessToken');
  console.log(`inside redux wrapper ${token}`);
  if (token) {
    store.dispatch(set_is_authenticated());
  } else {
    store.dispatch(set_not_authenticated());
  }
}


const root = ({ element }) => (

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} onBeforeLift={() => handleAuth(store)}>
    {element}
    </PersistGate>
  </Provider>
);

export default root;
