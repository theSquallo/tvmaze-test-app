const TV_MAZE_BASE_URL = "http://api.tvmaze.com";

const createApiUrl = (relativeUrl, params) => {
  let url = `${TV_MAZE_BASE_URL}${relativeUrl}?`;
  if (params) {
    Object.keys(params).forEach(paramName =>
      paramName.indexOf("embed") >= 0
        ? (url += `&embed[]=${params[paramName]}`)
        : (url += `&${paramName}=${params[paramName]}`)
    );
  }
  return url;
};

export const getShows = async ({ page }) => {
  const url = createApiUrl("/shows", { page });
  return fetch(url);
};

export const getShowInfo = async ({ id }) => {
  const fullUrl = createApiUrl(`/shows/${id}`, {
    embed1: "cast",
    embed2: "episodes"
  });
  return fetch(fullUrl);
};

export const searchShows = async ({ q }) => {
  const fullUrl = createApiUrl("/search/shows", { q });
  return fetch(fullUrl);
};
