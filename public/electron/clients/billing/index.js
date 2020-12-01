const BillingClient = require('./client');

// process.env.SPACE_SERVICES_URL is specially for local development
const baseURL = process.env.SPACE_BILLING_SERVICE_URL || 'https://7ll1etbd0m.execute-api.us-west-2.amazonaws.com/dev';
// eslint-disable-next-line no-console
console.log(`Init BillingClient, URL: ${baseURL}`);

const billingClient = new BillingClient({
  baseURL,
  timeout: 5000,
});

module.exports = billingClient;
