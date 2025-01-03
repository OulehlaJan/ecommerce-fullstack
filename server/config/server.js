module.exports = ({ env }) => {
  console.log('🚀 Server running on HOST:', env('HOST', '0.0.0.0'), 'PORT:', env.int('PORT', 1337));

  return {
    proxy: true,
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
    admin: {
      auth: {
        secret: env('ADMIN_JWT_SECRET'),
      },
    },
  };
};
