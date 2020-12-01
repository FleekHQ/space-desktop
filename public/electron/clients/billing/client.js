const axios = require('axios');

const accountEndpoints = require('./endpoints/account');

/**
 * @class
 * @param {Object} config - Config for billing client.
 * @param {string} config.baseURL - Base url.
 * @param {number} [config.timeout] - Base timeout in ms.
 * @param {Object} [config.headers] - Base headers.
 */
function BillingClient({
  baseURL,
  headers,
  timeout,
}) {
  /**
   * Axios instance.
   * @name BillingClient#instance
   * @type {axios.AxiosInstance}
   */
  this.instance = axios.create({
    baseURL,
  });

  if (timeout) {
    this.instance.defaults.timeout = timeout;
  }

  if (headers && typeof headers === 'object') {
    this.instance.defaults.headers.common = {
      ...headers,
    };
  }

  /**
   * Account endpoints.
   * @name BillingClient#account
   * @type {import('./endpoints/account.js')}
   */
  this.account = Object.keys(accountEndpoints).reduce((accountMethods, key) => ({
    ...accountMethods,
    [key]: accountEndpoints[key].bind(this),
  }), {});
}

module.exports = BillingClient;
