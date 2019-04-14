import { combineReducers } from "redux";
import { createAsyncReducer } from "../utils/redux-helper";
import { keys as actionKeys } from "../actions/appActions";
import showDetailReducer from "./modalReducer";
import paginationReducer from "./paginationReducer";

const successReducer = (state, action) => {
  const existingShows = state.response ? state.response : [];
  const page = state.nextPage ? state.nextPage : 0;

  return {
    ...state,
    isLoading: false,
    response: [...existingShows, ...action.response],
    nextPage: page + 1
  };
};

const successSearchReducer = (state, action) => {
  return {
    ...state,
    isLoading: false,
    response: action.response.map(item => item.show)
  };
};

const showsReducer = combineReducers({
  showDetail: showDetailReducer,
  pageInfo: paginationReducer,
  showsList: createAsyncReducer(actionKeys.GET_SHOWS, {
    [`${actionKeys.GET_SHOWS}_SUCCESS`]: successReducer
  }),
  searchShows: createAsyncReducer(actionKeys.SEARCH_SHOWS, {
    [`${actionKeys.SEARCH_SHOWS}_SUCCESS`]: successSearchReducer
  }),
  showInfo: createAsyncReducer(actionKeys.GET_SHOW_INFO)
});

export default showsReducer;
