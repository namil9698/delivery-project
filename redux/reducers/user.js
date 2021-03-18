import { flush } from '@redux-saga/core/effects';

export const initialState = {
  user: null,
  lodding: false,
  isLogin: false,
};

export const logInRequest = () => {
  return {
    type: 'LOG_IN_REQUEST',
  };
};

export const logOutRequest = () => {
  return {
    type: 'LOG_OUT_REQUEST',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        lodding: true,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLogin: true,
        lodding: false,
        user: {
          name: action.data.user.displayName,
          email: action.data.user.email,
          uid: action.data.user.uid,
        },
      };
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        lodding: false,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        lodding: true,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLogin: false,
        lodding: false,
        user: null,
      };
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        lodding: false,
      };
    default:
      return state;
  }
};

export default reducer;
