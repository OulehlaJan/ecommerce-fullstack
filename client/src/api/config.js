export const API_URL = (() => {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_API_URL_PRODUCTION;
  } else if (windows.location.hostname === "localhost") {
    return process.env.REACT_APP_API_URL_DEVELOPMENT;
  } else {
    return process.env.REACT_APP_API_URL_PREVIEW;
  }
})();
