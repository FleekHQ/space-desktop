const { ipcMain } = require('electron');

const { spaceClient, apiClient } = require('../clients');

const EVENT_PREFIX = 'billing';
const GET_BILLING_INFO_EVENT = `${EVENT_PREFIX}:get_billing_info`;
const GET_BILLING_INFO_SUCCESS_EVENT = `${EVENT_PREFIX}:get_billing_info:success`;
const GET_BILLING_INFO_ERROR_EVENT = `${EVENT_PREFIX}:get_billing_info:error`;

/* eslint-disable no-console */
const registerBillingEvents = (mainWindow) => {
  ipcMain.on(GET_BILLING_INFO_EVENT, async () => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();
      const { data } = await apiClient.billing.getBillingInfo({
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(GET_BILLING_INFO_SUCCESS_EVENT, data);
    } catch (error) {
      console.error('GET_BILLING_INFO_ERROR_EVENT', error);
      const message = error.message || error.toString();

      mainWindow.webContents.send(GET_BILLING_INFO_ERROR_EVENT, message);
    }
  });
};

module.exports = registerBillingEvents;
