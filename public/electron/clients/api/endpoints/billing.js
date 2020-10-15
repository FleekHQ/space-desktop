const DEFAULT_PATH = '/account';

/**
 * @typedef {Object} PlanInfo
 * @property {string} name
 * @property {string} type
 */

/**
 * @this {import('../client.js')}
 * @param {Object} payload
 * @param {string} payload.key
 * @param {string} payload.token
 * @returns {import('axios').AxiosResponse<PlanInfo>}
 */
function getAccount(payload) {
  return this.instance({
    method: 'get',
    url: DEFAULT_PATH,
    baseURL: process.env.SPACE_BILLING_SERVICE_URL,
    headers: {
      Authorization: payload.token,
    },
  });
}

module.exports = {
  getAccount,
};
