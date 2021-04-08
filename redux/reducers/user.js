import { useSelector } from 'react-redux';

export const initialState = {
  user: {
    name: '',
    email: '',
    uid: '',
  },
  userData: {
    history: [],
  },
  lodding: false,
  isLogin: false,
  popup: false,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const ORDER_SAVE_REQUEST = 'ORDER_SAVE_REQUEST';
export const ORDER_SAVE_SUCCESS = 'ORDER_SAVE_SUCCESS';
export const ORDER_SAVE_FAILURE = 'ORDER_SAVE_FAILURE';

export const GET_USERDATA_REQUEST = 'GET_USERDATA_REQUEST';
export const GET_USERDATA_SUCCESS = 'GET_USERDATA_SUCCESS';
export const GET_USERDATA_FAILURE = 'GET_USERDATA_FAILURE';

export const ORDER_POPUP_OPEN = 'ORDER_POPUP_OPEN';
export const ORDER_POPUP_CLOSE = 'ORDER_POPUP_CLOSE';

export const loginRequest = data => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequest = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const orderSaveRequest = (myFoodList, user, totalPrice, history, orderDate) => {
  return {
    type: ORDER_SAVE_REQUEST,
    data: {
      myFoodList,
      user,
      totalPrice,
      history,
      orderDate,
    },
  };
};

export const getUserDataRequest = data => {
  return {
    type: GET_USERDATA_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        lodding: false,
        user: {
          ...state.user,
          name: action.data.user.displayName,
          email: action.data.user.email,
          uid: action.data.user.uid,
        },
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        lodding: false,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        lodding: false,
        user: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        lodding: false,
      };
    case ORDER_SAVE_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case ORDER_SAVE_SUCCESS:
      return {
        ...state,
        isLogin: true,
        lodding: false,
      };
    case ORDER_SAVE_FAILURE:
      return {
        ...state,
        lodding: false,
      };
    case GET_USERDATA_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case GET_USERDATA_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          history: [...action.data.history],
        },
        lodding: false,
      };
    case GET_USERDATA_FAILURE:
      return {
        ...state,
        lodding: false,
      };
    case ORDER_POPUP_OPEN:
      return {
        ...state,
        popup: true,
      };
    case ORDER_POPUP_CLOSE:
      return {
        ...state,
        popup: false,
      };

    default:
      return state;
  }
};

export default reducer;
