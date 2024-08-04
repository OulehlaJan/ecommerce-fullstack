export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://stylish-one-7f1f35e5b636.herokuapp.com/api"
    : "http://localhost:1337/api";
