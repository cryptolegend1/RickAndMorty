const initialState = {
  isLoading: false,
  data: {},
  page: 1,
};

const charExistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHARACTER_EXISTS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CHARACTER_EXISTS_FAIL":
      return {
        ...state,
        isLoading: false,
      };
    case "CHARACTER_EXISTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: {
          ...action.payload,
          [action.charID]: action.payload.id,
        },
      };
    default:
      return state;
  }
};

export default charExistsReducer;
