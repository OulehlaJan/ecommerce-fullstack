export const API_URL = (() => {
  if (process.env.REACT_APP_ENV === "production") {
    return process.env.REACT_APP_API_URL_PRODUCTION;
  } else if (process.env.REACT_APP_ENV === "preview") {
    return process.env.REACT_APP_API_URL_PREVIEW;
  } else {
    return process.env.REACT_APP_API_URL_DEVELOPMENT;
  }
})();
