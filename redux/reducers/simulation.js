export const initialState = {
  myFoodList: [],
};

export const CHANGE_MYFOODLIST = 'CHANGE_MYFOODLIST';
export const DELETE_MYFOOD = 'DELETE_MYFOOD';
export const ADD_MYFOOD = 'ADD_MYFOOD';
export const SUB_MYFOOD = 'SUB_MYFOOD';
export const RESET_MYFOODLIST = 'RESET_MYFOODLIST';

export const chageMyFoodList = data => {
  return {
    type: CHANGE_MYFOODLIST,
    data,
  };
};

export const deleteMyFood = data => {
  return {
    type: DELETE_MYFOOD,
    data,
  };
};

export const addMyFood = data => {
  return {
    type: ADD_MYFOOD,
    data,
  };
};

export const subMyFood = data => {
  return {
    type: SUB_MYFOOD,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MYFOODLIST:
      return {
        ...state,
        myFoodList: [...state.myFoodList, { ...action.data, qty: 1 }],
      };

    case DELETE_MYFOOD:
      return {
        ...state,
        myFoodList: state.myFoodList.filter(food => food.id !== action.data.id),
      };

    case ADD_MYFOOD:
      return {
        ...state,
        myFoodList: state.myFoodList.map(food =>
          food.id === action.data.id ? { ...food, qty: food.qty + 1 } : food
        ),
      };

    case SUB_MYFOOD:
      return {
        ...state,
        myFoodList: state.myFoodList.map(food =>
          food.id === action.data.id ? { ...food, qty: food.qty - 1 } : food
        ),
      };
    case RESET_MYFOODLIST:
      return {
        ...state,
        myFoodList: [],
      };

    default:
      return state;
  }
};

export default reducer;
