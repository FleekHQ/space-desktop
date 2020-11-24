const path = require('path');
const chalk = require('chalk');
const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');

const EVENT_PREFIX = 'fuse';
const INSTALL_FUSE_EVENT = `${EVENT_PREFIX}:install`;
const INSTALL_FUSE_ERROR_EVENT = `${INSTALL_FUSE_EVENT}:error`;
const INSTALL_FUSE_SUCCESS_EVENT = `${INSTALL_FUSE_EVENT}:success`;

/* eslint-disable no-console */
const registerFuseEvents = () => {
  ipcMain.on(INSTALL_FUSE_EVENT, async (event) => {
    const installFuse = () => new Promise((resolve, reject) => {
      const installerPath = isDev
        ? path.join(__dirname, '../../../resources/FuseInstaller.pkg')
        : path.join(process.resourcesPath, 'FuseInstaller.pkg');

      const command = `sudo -A installer -pkg ${installerPath} -target /`;
      const options = {
        env: {
          PATH: process.env.PATH,
          SUDO_ASKPASS: path.join(__dirname, 'askpass.osascript.js'),
        },
      };

      exec(command, options, (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err || stderr);
          return;
        }

        resolve(stdout);
      });
    });

    const loadFuseKernel = () => new Promise((resolve, reject) => {
      const command = '/Library/Filesystems/osxfuse.fs/Contents/Resources/load_osxfuse';

      exec(command, (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err || stderr);
          return;
        }

        resolve(stdout);
      });
    });

    try {
      console.log(chalk.yellow('installing fuse'));
      const resInstall = await installFuse();
      console.log(chalk.blue(resInstall));

      console.log(chalk.yellow('loading fuse kernel'));
      const resKernel = await loadFuseKernel();
      console.log(chalk.blue(resKernel));

      event.sender.send(INSTALL_FUSE_SUCCESS_EVENT);
      console.log(chalk.yellow('installation completed successfully'));
    } catch (error) {
      console.error(chalk.red(error));
      event.sender.send(INSTALL_FUSE_ERROR_EVENT);
    }
  });
};

module.exports = registerFuseEvents;
