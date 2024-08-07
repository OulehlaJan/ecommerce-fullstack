export const API_URL = (() => {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_API_URL_PRODUCTION;
  } else if (window.location.hostname === "localhost") {
    return process.env.REACT_APP_API_URL_DEVELOPMENT;
  } else if (process.env.NODE_ENV === "preview") {
    return process.env.REACT_APP_API_URL_PREVIEW;
  }
})();
