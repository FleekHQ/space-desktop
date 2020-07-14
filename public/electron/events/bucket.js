const { ipcMain } = require('electron');

const spaceClient = require('../space-client');

const EVENT_PREFIX = 'bucket';
const JOIN_EVENT = `${EVENT_PREFIX}:join`;
const JOIN_ERROR_EVENT = `${EVENT_PREFIX}:join:error`;
const JOIN_SUCCESS_EVENT = `${EVENT_PREFIX}:join:success`;

const registerBucketEvents = (mainWindow) => {
  ipcMain.on(JOIN_EVENT, async (event, payload) => {
    try {
      await spaceClient.joinBucket(payload);
      mainWindow.webContents.send(JOIN_SUCCESS_EVENT, payload);
    } catch (err) {
      mainWindow.webContents.send(JOIN_ERROR_EVENT, err);
    }
  });
};

module.exports = registerBucketEvents;
