const router = require("express").Router();
const stripe = require("stripe")(process.env.SECRET_KEY);

router.post("/", async (req, res) => {
  // Getting Product details and token from the client side
  const { product, token, price } = req.body;

  console.log(`Payment of ${price} is successfully Completed !!!`);

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: price * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
        description: "Processing Payment",
      });
    })
    .then((result) => res.status(200).json(result));
});

module.exports = router;
