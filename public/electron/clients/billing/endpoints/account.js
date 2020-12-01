const DEFAULT_PATH = '/account';

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
function getCurrent(payload) {
  return this.instance({
    method: 'get',
    url: `${DEFAULT_PATH}/usage`,
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
function getHistory(payload) {
  return this.instance({
    method: 'get',
    url: `${DEFAULT_PATH}/usage-history`,
    headers: {
      Authorization: payload.token,
    },
  });
}

module.exports = {
  getCurrent,
  getHistory,
};
