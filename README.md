# Checkout page with subscriptions

Explore a full, working code sample of an integration with Stripe Checkout and Customer Portal. The client- and server-side code redirects to a prebuilt payment page hosted on Stripe. More at [https://stripe.com/docs/api/checkout/sessions](https://stripe.com/docs/api/checkout/sessions)

## Setup/Prerequisites
 - [You will need a Stripe account](https://stripe.com/)
 - In addition to running `npm install` you will need to create a `.env` in the root directory of this project, and add to it your test and secret keys.
   - be sure they are named as they appear in `server.js` (TEST_KEY, SECRET_KEY)


## Running the sample

1. Build the server <small>Prerequisite: You will need node.js and npm installed globally.</small>
   
~~~
npm install
~~~

2. Add or update price items by editing create_price.js and running

~~~
node create_price.js
~~~

- Update checkout.html to include a new product and form element related with the `price_id` you just created.

3. Run the server

~~~
npm run start
~~~

1. Go to [http://localhost:4242](http://localhost:4242)
