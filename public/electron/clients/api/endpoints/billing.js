const BILLING_URL = `${process.env.SPACE_BILLING_SERVICE_URL}/account` || 'https://7ll1etbd0m.execute-api.us-west-2.amazonaws.com/dev/account';

/**
 * @typedef {Object} CurrentUsageInfo
 * @property {number} storage
 * @property {number} bandwidth
 */

/**
 * @this {import('../client.js')}
 * @param {Object} payload
 * @param {string} payload.token
 * @returns {import('axios').AxiosResponse<CurrentUsageInfo>}
 */
function getCurrentUsageInfo(payload) {
  return this.instance({
    method: 'get',
    url: `${BILLING_URL}/usage`,
    headers: {
      Authorization: payload.token,
    },
  });
}

/**
 * @typedef {Object} HistoryUsageInfo
 * @property {string} date
 * @property {number} usage
 */

/**
 * @this {import('../client.js')}
 * @param {Object} payload
 * @param {string} payload.token
 * @returns {import('axios').AxiosResponse<Array<HistoryUsageInfo>>}
 */
function getHistoryUsageInfo(payload) {
  return this.instance({
    method: 'get',
    url: `${BILLING_URL}/usage-history`,
    headers: {
      Authorization: payload.token,
    },
  });
}

module.exports = {
  getCurrentUsageInfo,
  getHistoryUsageInfo,
};
