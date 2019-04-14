import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddlware from "redux-thunk";
import { createLogger } from "redux-logger";
import showsReducer from "../reducers/showsReducer";

const rootReducer = combineReducers({
  tvMazeShows: showsReducer
});

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(thunkMiddlware, loggerMiddleware))
);

export default store;