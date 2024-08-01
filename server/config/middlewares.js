const path = require("path");

module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "http:", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://stylish-one-7f1f35e5b636.herokuapp.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://stylish-one-7f1f35e5b636.herokuapp.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:5000",
        "https://stylish-one-7f1f35e5b636.herokuapp.com",
      ],
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
