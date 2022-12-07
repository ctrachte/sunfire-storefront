# Checkout page with subscriptions

Explore a full, working code sample of an integration with Stripe Checkout and Customer Portal. The client- and server-side code redirects to a prebuilt payment page hosted on Stripe. More at [https://stripe.com/docs/api/checkout/sessions](https://stripe.com/docs/api/checkout/sessions)

## Running the sample

1. Build the server <small>Prerequisite: You will need node.js and npm installed globally.</small>
   
~~~
npm install
~~~

2. Add or update price items by editing create_price.js and running `node create_price.js`
   
3. Run the server

~~~
npm start
~~~

4. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)
