import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import { configurePersist } from './localstorage-middleware.js';
import rootReducer from './root-reducer.js';
import rootSaga from './root-saga.js';

const devMode = process.env.NODE_ENV === `development`;

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (process.browser &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const { load, save } = configurePersist();
const middlewares = [sagaMiddleware, save];

if (devMode) {
  middlewares.push(logger);
}

const makeStore = () => {
  const store = createStore(
    rootReducer,
    load(rootReducer()),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
