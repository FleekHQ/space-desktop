const { ipcMain } = require('electron');

const { spaceClient, apiClient } = require('../clients');

const EVENT_PREFIX = 'billing';
const GET_ACCOUNT_EVENT = `${EVENT_PREFIX}:account`;
const GET_ACCOUNT_ERROR_EVENT = `${EVENT_PREFIX}:account:error`;
const GET_ACCOUNT_SUCCESS_EVENT = `${EVENT_PREFIX}:account:success`;

const registerWalletEvents = (mainWindow) => {
  ipcMain.on(GET_ACCOUNT_EVENT, async () => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();

      const { data } = await apiClient.billing.getAccount({
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(GET_ACCOUNT_SUCCESS_EVENT, data);
    } catch (error) {
      mainWindow.webContents.send(GET_ACCOUNT_ERROR_EVENT, {
        message: error.message,
      });
    }
  });
};

module.exports = registerWalletEvents;
