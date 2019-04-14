export const keys = {
  SET_MAX_PAGES: "SET_MAX_PAGES",
  CHANGE_PAGE: "CHANGE_PAGE"
};

export const changePage = page => {
  return {
    type: keys.CHANGE_PAGE,
    page
  };
};

export const setMaxPages = maxPage => {
  return {
    type: keys.SET_MAX_PAGES,
    maxPage
  };
};
