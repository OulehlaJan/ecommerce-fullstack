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
          process.env.SUCCESS_URL || "http://localhost:3000/checkout/success",
        cancel_url:
          process.env.CANCEL_URL || "http://localhost:3000/checkout/cancel",
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

  // // HANDLE STRIPE WEBHOOK EVENTS
  // async handleWebhook(ctx) {
  //   const sig = ctx.request.headers["stripe-signature"];
  //   let event;

  //   try {
  //     event = stripe.webhooks.constructEvent(
  //       ctx.request.body,
  //       sig,
  //       process.env.STRIPE_WEBHOOK_SECRET
  //     );
  //   } catch (err) {
  //     ctx.response.status = 400;
  //     ctx.body = `Webhook Error: ${err.message}`;
  //     return;
  //   }

  //   // HANDLE THE EVENT
  //   switch (event.type) {
  //     case "checkout.session.completed":
  //       const session = event.data.object;
  //       // UPDATE ORDER STATUS TO "PAID"
  //       await strapi.service("api::order.order").update({
  //         where: { stripeSessionId: session.id },
  //         data: { status: "paid" },
  //       });
  //       break;
  //     case "payment_intent.payment_failed":
  //       const failedIntent = event.data.object;
  //       // Handle the failed payment intent
  //       await strapi.service("api::order.order").update({
  //         where: { stripeSessionId: failedIntent.id },
  //         data: { status: "failed" },
  //       });
  //       break;
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }

  //   ctx.send({ received: true });
  // },
}));
