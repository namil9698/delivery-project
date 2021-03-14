import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import simulation from './simulation';

const initialState = {
  simulation: {},
};

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  simulation,
});

export default rootReducer;
