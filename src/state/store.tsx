import { createStore, applyMiddleware, Store} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import { createLogger } from 'redux-logger'
import storage from 'redux-persist/lib/storage';
import appReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);
const loggerMiddleware = createLogger();
const middleware = composeWithDevTools(applyMiddleware(loggerMiddleware));

const reduxStore = () => {
  const store = createStore(
    persistedReducer,
    middleware
  );
  const persistor = persistStore(store);
  return { store, persistor };
}

export default reduxStore;