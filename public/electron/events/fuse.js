const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');
const downloadFile = require('../utils/downloader');

const EVENT_PREFIX = 'fuse';

const DOWNLOAD_FUSE_EVENT = `${EVENT_PREFIX}:download`;
const DOWNLOAD_FUSE_ERROR_EVENT = `${DOWNLOAD_FUSE_EVENT}:error`;
const DOWNLOAD_FUSE_SUCCESS_EVENT = `${DOWNLOAD_FUSE_EVENT}:success`;
const UPDATE_PROGRESS_DOWNLOAD_FUSE_EVENT = `${DOWNLOAD_FUSE_EVENT}:update`;

const INSTALL_FUSE_EVENT = `${EVENT_PREFIX}:install`;
const INSTALL_FUSE_ERROR_EVENT = `${INSTALL_FUSE_EVENT}:error`;
const INSTALL_FUSE_SUCCESS_EVENT = `${INSTALL_FUSE_EVENT}:success`;

const DELETE_FUSE_INSTALLER = `${EVENT_PREFIX}:delete`;
const DELETE_FUSE_INSTALLER_ERROR = `${DELETE_FUSE_INSTALLER}:error`;
const DELETE_FUSE_INSTALLER_SUCCESS = `${DELETE_FUSE_INSTALLER}:success`;

const fusePkgUrl = 'https://space-fuse-asset.s3-us-west-2.amazonaws.com/FUSE+for+macOS+3.11.0.pkg';
const resourceName = 'FuseInstaller.pkg';

/* eslint-disable no-console */
const registerFuseEvents = (mainWindow) => {
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

  ipcMain.on(DOWNLOAD_FUSE_EVENT, async () => {
    try {
      const cwd = process.cwd();
      const [data, headers, writer] = await downloadFile(fusePkgUrl, cwd, resourceName);

      const totalLength = headers['content-length'];

      data.on('data', (chunk) => {
        mainWindow.webContents.send(UPDATE_PROGRESS_DOWNLOAD_FUSE_EVENT, {
          totalLength,
          chunkLength: chunk.length,
        });
      });

      data.on('error', (error) => {
        data.destroy();
        writer.destroy();
        console.error('DOWNLOAD_FUSE_ERROR_EVENT', error);
        mainWindow.webContents.send(DOWNLOAD_FUSE_ERROR_EVENT, error);
      });

      writer.on('error', (error) => {
        writer.destroy();
        console.error('DOWNLOAD_FUSE_ERROR_EVENT', error);
        mainWindow.webContents.send(DOWNLOAD_FUSE_ERROR_EVENT, error);
      });

      writer.on('finish', async () => {
        mainWindow.webContents.send(DOWNLOAD_FUSE_SUCCESS_EVENT);
      });

      data.pipe(writer);
    } catch (error) {
      console.error('DOWNLOAD_FUSE_ERROR_EVENT', error);
      mainWindow.webContents.send(DOWNLOAD_FUSE_ERROR_EVENT, error);
    }
  });

  ipcMain.on(DELETE_FUSE_INSTALLER, (event) => {
    fs.unlink(path.join(process.cwd(), resourceName), (err) => {
      if (err) {
        event.sender.send(DELETE_FUSE_INSTALLER_ERROR, err);
        return;
      }

      event.sender.send(DELETE_FUSE_INSTALLER_SUCCESS);
    });
  });
};

module.exports = registerFuseEvents;
