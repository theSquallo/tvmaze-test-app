import { keys } from "../actions/modalActions";
import { createReducer } from "../utils/redux-helper";

const showDetailReducer = createReducer(
  { isOpen: false, showId: undefined },
  {
    [keys.OPEN_SHOW_DETAIL]: (state, action) => ({
      isOpen: true,
      showId: action.showId
    }),
    [keys.CLOSE_SHOW_DETAIL]: (state, action) => ({
      ...state,
      isOpen: false
    })
  }
);

export default showDetailReducer;
