export const keys = {
  OPEN_SHOW_DETAIL: "OPEN_SHOW_DETAIL",
  CLOSE_SHOW_DETAIL: "CLOSE_SHOW_DETAIL"
};

export const openShowDetail = showId => {
  return {
    type: keys.OPEN_SHOW_DETAIL,
    showId
  };
};

export const closeShowDetail = () => {
  return {
    type: keys.CLOSE_SHOW_DETAIL
  };
};
