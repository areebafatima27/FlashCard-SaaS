// pages/api/checkout-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { origin } = req.headers;
      const params = {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Pro Subscription",
              },
              unit_amount: 1000, // $10.00, as Stripe expects amounts in cents
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `$(req.headers.get{
                'origin',}),/result?session_id={CHECKOUY_SESSION_ID}`,
        cancel_url: `$(req.headers.get{
                'origin',}),/result?session_id={CHECKOUY_SESSION_ID}`,
      };

      const checkoutSession = await stripe.checkout.sessions.create(params);

      // Send back the sessionId to the client
      res.status(200).json({ sessionId: checkoutSession.id });
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
