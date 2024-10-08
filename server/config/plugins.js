module.exports = ({ env }) => ({
  stripe: {
    secretKey: env("STRIPE_SECRET_KEY"),
    publishableKey: env("STRIPE_PUBLISHABLE_KEY"),
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          quality: "100",
          fetch_format: "auto",
        },
        uploadStream: {
          quality: "100",
          fetch_format: "auto",
        },
        delete: {},
      },
    },
  },
});
