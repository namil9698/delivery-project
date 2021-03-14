import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

const makeStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === 'producton'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
