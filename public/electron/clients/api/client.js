const axios = require('axios');

const walletEndpoints = require('./endpoints/wallet');
const identityEndpoints = require('./endpoints/identity');
const identitiesEndpoints = require('./endpoints/identities');
const accountEndpoints = require('./endpoints/account');

/**
 * @class
 * @param {Object} config - Config for api client.
 * @param {string} config.baseURL - Base url.
 * @param {number} [config.timeout] - Base timeout in ms.
 * @param {Object} [config.headers] - Base headers.
 */
function ApiClient({
  baseURL,
  headers,
  timeout,
}) {
  /**
   * Axios instance.
   * @name ApiClient#instance
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
   * Identity endpoints.
   * @name ApiClient#identity
   * @type {import('./endpoints/identity.js')}
   */
  this.identity = Object.keys(identityEndpoints).reduce((identityMethods, key) => ({
    ...identityMethods,
    [key]: identityEndpoints[key].bind(this),
  }), {});

  /**
   * Identities endpoints.
   * @name ApiClient#identities
   * @type {import('./endpoints/identities.js')}
   */
  this.identities = Object.keys(identitiesEndpoints).reduce((identitiesMethods, key) => ({
    ...identitiesMethods,
    [key]: identitiesEndpoints[key].bind(this),
  }), {});

  /**
   * Wallet endpoints.
   * @name ApiClient#wallet
   * @type {import('./endpoints/wallet.js')}
   */
  this.wallet = Object.keys(walletEndpoints).reduce((walletMethods, key) => ({
    ...walletMethods,
    [key]: walletEndpoints[key].bind(this),
  }), {});

  /**
   * Account endpoints.
   * @name ApiClient#account
   * @type {import('./endpoints/account.js')}
   */
  this.account = Object.keys(accountEndpoints).reduce((accountMethods, key) => ({
    ...accountMethods,
    [key]: accountEndpoints[key].bind(this),
  }), {});
}

module.exports = ApiClient;
