module.exports = ({ env }) => ({
  stripe: {
    secretKey: env("STRIPE_SECRET_KEY"),
    publishableKey: env("STRIPE_PUBLISHABLE_KEY"),
  },
});
