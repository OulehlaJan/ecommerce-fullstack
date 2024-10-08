module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
            "https://stylish-one.netlify.app",
            "https://preview-stylish-one.netlify.app",
            "http://localhost:3000",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
            "https://stylish-one.netlify.app",
            "https://preview-stylish-one.netlify.app",
            "http://localhost:3000",
          ],
          upgradeInsecureRequests: null,
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      xssProtection: {
        enabled: true,
        mode: "block",
      },
      frameguard: {
        action: "deny",
      },
      noSniff: true,
      referrerPolicy: {
        policy: "no-referrer",
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://stylish-one.netlify.app",
        "http://localhost:3000",
        "https://preview-stylish-one.netlify.app",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
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
