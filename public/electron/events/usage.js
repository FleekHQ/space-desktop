const get = require('lodash/get');
const { ipcMain } = require('electron');

const { spaceClient, billingClient } = require('../clients');

const EVENT_PREFIX = 'usage';
const GET_CURRENT_USAGE_EVENT = `${EVENT_PREFIX}:currentUsage`;
const GET_CURRENT_USAGE_ERROR_EVENT = `${EVENT_PREFIX}:currentUsage:error`;
const GET_CURRENT_USAGE_SUCCESS_EVENT = `${EVENT_PREFIX}:currentUsage:success`;
const GET_HISTORY_USAGE_EVENT = `${EVENT_PREFIX}:historyUsage`;
const GET_HISTORY_USAGE_ERROR_EVENT = `${EVENT_PREFIX}:historyUsage:error`;
const GET_HISTORY_USAGE_SUCCESS_EVENT = `${EVENT_PREFIX}:historyUsage:success`;

const registerAuthEvents = (mainWindow) => {
  ipcMain.on(GET_CURRENT_USAGE_EVENT, async () => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();
      const { data } = await billingClient.account.getCurrent({
        token: apiTokens.getServicestoken(),
      });
      mainWindow.webContents.send(GET_CURRENT_USAGE_SUCCESS_EVENT, data);
    } catch (error) {
      const message = get(error, 'response.data.Message') || error.toString();
      mainWindow.webContents.send(GET_CURRENT_USAGE_ERROR_EVENT, {
        message,
      });
    }
  });

  ipcMain.on(GET_HISTORY_USAGE_EVENT, async () => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();
      const { data } = await billingClient.account.getHistory({
        token: apiTokens.getServicestoken(),
      });
      mainWindow.webContents.send(GET_HISTORY_USAGE_SUCCESS_EVENT, data);
    } catch (error) {
      const message = get(error, 'response.data.Message') || error.toString();
      mainWindow.webContents.send(GET_HISTORY_USAGE_ERROR_EVENT, {
        message,
      });
    }
  });
};

module.exports = registerAuthEvents;
