import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import Saga from './Saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import {RootReducer} from './Slices';

export type RootState = ReturnType<typeof RootReducer>;

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true, // to get useful logging
  blacklist: [''],
};

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Define middleware function
const middleware = () => {
  const middlewareArr = [sagaMiddleware];

  if (__DEV__) {
    middlewareArr.push(
      createLogger({
        collapsed: true,
        duration: true,
        timestamp: true,
        colors: {
          title: () => '#F2789F',
          prevState: () => '#de6f0d',
          action: () => '#CAB8FF',
          nextState: () => '#1a9134',
        },
      }),
    );
  }

  return middlewareArr;
};

// Create persisted reducer
const persistedReducer = persistReducer(config, RootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware, // Pass the middleware function here
});

// Create persistor
const persistor = persistStore(store, {}, () => {
  // console.log('Test', store.getState());
});

// Run saga middleware
sagaMiddleware.run(Saga);

console.log('Redux Store: ', store.getState());

export {store, persistor};
