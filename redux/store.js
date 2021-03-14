import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';

import reducer from './reducers';

const makeStore = () => {
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: true,
});

export default wrapper;
