import { keys } from "../actions/paginationActions";
import { createReducer } from "../utils/redux-helper";

const pagintaionReducer = createReducer(
  { currentPage: 1, maxPage: undefined },
  {
    [keys.CHANGE_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.page
    }),
    [keys.SET_MAX_PAGES]: (state, action) => ({
      ...state,
      maxPage: action.maxPage
    })
  }
);

export default pagintaionReducer;
