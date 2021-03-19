export const initialState = {
  user: null,
  lodding: false,
  isLogin: false,
};

export const LOGIN_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOGIN_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOGIN_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOGIN_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOGIN_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOGIN_OUT_FAILURE = 'LOG_OUT_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_IN_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case LOGIN_IN_SUCCESS:
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
    case LOGIN_IN_FAILURE:
      return {
        ...state,
        lodding: false,
      };
    case LOGIN_OUT_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case LOGIN_OUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        lodding: false,
        user: null,
      };
    case LOGIN_OUT_FAILURE:
      return {
        ...state,
        lodding: false,
      };
    default:
      return state;
  }
};

export default reducer;
