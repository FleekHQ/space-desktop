const EVENT_PREFIX = 'appUpdate';
const { ipcMain } = require('electron');
const CONFIRM_EVENT = `${EVENT_PREFIX}:confirm`;

const registerAppUpdateEvents = ({
  app,
  mainWindow,
  autoUpdater,
}) => {
  ipcMain.on(CONFIRM_EVENT, (event, payload) => {
    console.log('UPDATE CONFIRM!!');
    app.relaunch();
    app.exit(0);
  });

  autoUpdater.on('checking-for-update', () => {
  });

  autoUpdater.on('update-available', (info) => {
    console.log('update-available', info);
  });

  autoUpdater.on('update-not-available', (info) => {
    console.log('update-not-available', info);
  });

  autoUpdater.on('error', (err) => {
    console.log('error', err);
    // mainWindow.webContents.send(ERROR_EVENT, err);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    console.log('download-progress', progressObj);
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.log('update-downloaded', info);
    // mainWindow.webContents.send(ERROR_EVENT, err);
    autoUpdater.quitAndInstall();  
  });
};

module.exports = registerAppUpdateEvents;
