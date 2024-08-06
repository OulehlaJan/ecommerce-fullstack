"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    try {
      const { products, userName, email } = ctx.request.body;

      // RETRIEVE ITEM INFORMATION
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);
          return {
            price_data: {
              currency: "usd",
              product_data: { name: item.name },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      // CREATE A STRIPE SESSION
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url:
          process.env.SUCCESS_URL || "https://stylish-one.netlify.app/checkout/success",
        cancel_url:
          process.env.CANCEL_URL || "",
        line_items: lineItems,
      });

      // CREATE THE ORDER
      await strapi.service("api::order.order").create({
        data: { userName, products, stripeSessionId: session.id },
      });

      // RETURN SESSION ID
      ctx.send({ id: session.id });
    } catch (error) {
      ctx.response.status = 500;
      ctx.send({
        error: { message: "There was a problem creating the charge" },
      });
    }
  },
}));
