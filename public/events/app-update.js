const { dialog } = require('electron');

const registerAppUpdateEvents = ({
  app,
  autoUpdater,
}) => {
  try {
    autoUpdater.checkForUpdates();

    autoUpdater.on('update-downloaded', () => {
      // eslint-disable-next-line no-console
      console.log('The last update of the space app was successfully downloaded.');

      const res = dialog.showMessageBoxSync({
        buttons: ['No', 'Yes'],
        message: 'New update available! Do you want to restart space to install last updates?',
      });

      if (res === 1) {
        setImmediate(() => {
          autoUpdater.quitAndInstall();
          setTimeout(() => {
            app.exit(0);
            app.relaunch();
          });
        });
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Errror when try to check for updates: ${error.stack || error.message}`);
  }
};

module.exports = registerAppUpdateEvents;
