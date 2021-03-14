const initialState = {
  myFoodList: [],
};

const chageMyFoodList = data => {
  return {
    typpe: 'CHANGE_MYFOODLIST',
    data,
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MYFOODLIST':
      return {
        ...state,
      };
  }
};

export default rootReducer;
