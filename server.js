// const strapi = require("@strapi/strapi");
// strapi().start();

'use strict';

const strapi = require('@strapi/strapi');
const path = require('path');
const serve = require('koa-static');
const mount = require('koa-mount');
const send = require('koa-send');
const Router = require('@koa/router');

module.exports = {
  register({ strapi }) {},
  bootstrap({ strapi }) {
    const { koaApp } = strapi.server;
    const router = new Router();

    // Serve static files from public directory
    koaApp.use(mount('/', serve(path.join(__dirname, 'public'))));

    // Fallback to index.html for all other routes
    router.get('/*', async (ctx) => {
      await send(ctx, 'public/index.html', { root: path.join(__dirname, '/') });
    });

    koaApp.use(router.routes()).use(router.allowedMethods());
  },
};
