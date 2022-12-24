const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);
// const Order = require("../models/Order")




const result = {
  "id": "tok_1MIea2SF5vv5p9Pvb1C5UF20",
  "object": "token",
  "card": {
    "id": "card_1MIea1SF5vv5p9PvnPTnzgQc",
    "object": "card",
    "address_city": "Beverly Hills",
    "address_country": "United States",
    "address_line1": "california",
    "address_line1_check": "unchecked",
    "address_line2": null,
    "address_state": "CA",
    "address_zip": "90210",
    "address_zip_check": "unchecked",
    "brand": "Visa",
    "country": "US",
    "cvc_check": "unchecked",
    "dynamic_last4": null,
    "exp_month": 8,
    "exp_year": 2023,
    "funding": "credit",
    "last4": "4242",
    "name": "bvb",
    "tokenization_method": null
  },
  "client_ip": "223.231.223.15",
  "created": 1671914670,
  "email": "bvb@gmail.com",
  "livemode": false,
  "type": "card",
  "used": false
}

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(200).json(result);
        // res.status(500).json(stripeErr);
      } else {
        const result = stripeRes;
        res.send(result)
        res.status(200).json(stripeRes);
      }
    }
  );
});

// router.post("/payment", async(req, res) => {

//   try{
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: [{
//         price_data:{
//           amount: req.body.amount,
//           currency: 'inr'
//         }
//       }],
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cart',
//     })
//     console.log(session);
//     res.status(200).json(session);
//   }catch(err){
//     console.log(err)
//     res.status(500).json(`${err}`);
//   }
// })





// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// const stripe = require('stripe')('sk_test_51MHXWxSF5vv5p9PvD3IUq421B5bBeUa2n8Lmg57BeUBZ7Xz6aGqjqW3UUQlGMUlbuFHuqw1meQQIFmRTnrcaadSJ00G207v7Zx');

// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ['card'],
//   mode: 'setup',
//   success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//   cancel_url: 'https://example.com/cancel',
// });

// router.post("/payment", (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });


module.exports = router;
