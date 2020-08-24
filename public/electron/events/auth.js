const { ipcMain } = require('electron');

const { apiClient, spaceClient } = require('../clients');

const EVENT_PREFIX = 'auth';
const SIGNUP_EVENT = `${EVENT_PREFIX}:signup`;
const SIGNUP_ERROR_EVENT = `${EVENT_PREFIX}:signup:error`;
const SIGNUP_SUCCESS_EVENT = `${EVENT_PREFIX}:signup:success`;
const CHECK_USERNAME_EVENT = `${EVENT_PREFIX}:check_username`;
const CHECK_USERNAME_ERROR_EVENT = `${EVENT_PREFIX}:check_username:error`;
const CHECK_USERNAME_SUCCESS_EVENT = `${EVENT_PREFIX}:check_username:success`;

const registerAuthEvents = (mainWindow) => {
  ipcMain.on(SIGNUP_EVENT, async (_, payload) => {
    try {
      const res = await spaceClient.getAPISessionTokens();
      const { data } = await apiClient.identity.update({
        ...payload,
        token: res.getServicestoken(),
      });
      mainWindow.webContents.send(SIGNUP_SUCCESS_EVENT, data.data);
    } catch (error) {
      let message = error.message || '';

      if (error.response && error.response.data) {
        if (error.response.status === 409) {
          message = 'modules.signup.errors.username';
        }
      }

      mainWindow.webContents.send(SIGNUP_ERROR_EVENT, {
        message,
      });
    }
  });

  ipcMain.on(CHECK_USERNAME_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.getIdentityByUsername(payload);
      mainWindow.webContents.send(CHECK_USERNAME_SUCCESS_EVENT, {
        identity: res.getIdentity(),
      });
    } catch (err) {
      mainWindow.webContents.send(CHECK_USERNAME_ERROR_EVENT, err);
    }
  });
};

module.exports = registerAuthEvents;
