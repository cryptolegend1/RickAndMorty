const initialState = {
  data: [],
  isLoading: false,
  page: 1,
  itemCount: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LIST_LOADING_FAIL":
      return {
        ...state,
        isLoading: false,
      };
    case "LIST_LOADING_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload.results,
        page: action.payload.info.pages,
      };
    case "UPDATE_PAGE":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        page: action.payload.page,
      };
    case "FILTER_LIST_BY_STATUS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
