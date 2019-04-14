import { createAsyncActionCreator } from "../utils/redux-helper";
import * as apiFunctions from "../utils/mock-tvmaze-api";

export const keys = {
  GET_SHOWS: "GET_SHOWS",
  GET_SHOW_INFO: "GET_SHOW_INFO",
  SEARCH_SHOWS: "SEARCH_SHOWS"
};

export const getShows = page =>
  createAsyncActionCreator(keys.GET_SHOWS, apiFunctions.getShows, { page });

export const getShowInfo = id =>
  createAsyncActionCreator(keys.GET_SHOW_INFO, apiFunctions.getShowInfo, {
    id
  });

export const searchShowsReq = q =>
  createAsyncActionCreator(keys.SEARCH_SHOWS, apiFunctions.searchShows, {
    q
  });
