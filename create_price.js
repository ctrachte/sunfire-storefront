require('dotenv').config();
let stripe;
if (process.env.NODE_ENV !== 'production') {
  stripe = require('stripe')(process.env.TEST_KEY);
} else {
  stripe = require('stripe')(process.env.SECRET_KEY);
}
stripe.products.create({
  name: 'Starter Subscription',
  description: '$15/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1500,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});