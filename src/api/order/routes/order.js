"use strict";

/**
 * order router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const defaultRouter = createCoreRouter("api::order.order");

const customRoutes = [
  {
    method: "POST",
    path: "/order/webhook",
    handler: "order.handleWebhook",
    config: {
      auth: false,
    },
  },
];

module.exports = {
  routes: [...defaultRouter.routes, ...customRoutes],
};
