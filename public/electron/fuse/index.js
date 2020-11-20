const path = require('path');
const chalk = require('chalk');
const get = require('lodash/get');
const { spawn, exec } = require('child_process');

/**
 * FuseInstallerProcess is used to installed the FuseInstaller.pkg in the resources folder.
 *
 * If FUSE is needed to be installed, call the `start()` function and listen
 * `on('success')` or `on('failed')` to know when the installation is completed.
 */
class FuseInstallerProcess {
  constructor() {
    this.childProcess = null;
    this.handlers = {
      success: [],
      failed: [],
      pending: [],
    };
  }

  on(key, handler) {
    const accHandlers = get(this.handlers, key, []) || [];

    this.handlers = {
      ...this.handlers,
      [key]: [
        ...accHandlers,
        handler,
      ],
    };
  }

  callHandlers(key, args) {
    if (this.handlers[key]) {
      this.handlers[key].forEach((handler) => handler(args));
    }
  }

  start(isDev) {
    if (this.childProcess) return;

    this.callHandlers('pending');

    if (process.platform !== 'darwin') {
      this.callHandlers('failed', 'installing FUSE not supported');
      return;
    }

    let installerPath = path.join(process.resourcesPath, 'FuseInstaller.pkg');
    if (isDev) {
      installerPath = path.join(__dirname, '../../../resources/FuseInstaller.pkg');
    }

    this.childProcess = spawn('sudo', ['-A', 'installer', '-pkg', installerPath, '-target', '/'], {
      env: {
        PATH: process.env.PATH,
        SUDO_ASKPASS: path.join(__dirname, 'askpass.osascript.js'),
      },
    });
    this.childProcess.stdout.on('data', (data) => {
      const outputLog = data.toString().toLowerCase();

      // eslint-disable-next-line no-console
      console.log(chalk.blue(outputLog));

      if (outputLog.includes('the install was successful') || outputLog.includes('the upgrade was successful')) {
        // eslint-disable-next-line no-console
        console.log(chalk.blue('OsxFuse Kernel Installed'));
        this.loadFuseKernel();
      }
    });

    this.childProcess.stderr.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.error(chalk.red(data));
      this.callHandlers('failed');
    });
  }

  loadFuseKernel() {
    // eslint-disable-next-line no-console
    console.log(chalk.blue('Loading OsxFuse Kernel'));
    exec('/Library/Filesystems/osxfuse.fs/Contents/Resources/load_osxfuse', (err, stdout) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(chalk.red(err.message));
        this.callHandlers('failed');
        return;
      }

      // eslint-disable-next-line no-console
      console.log(chalk.blue(stdout));
      // eslint-disable-next-line no-console
      console.log(chalk.blue('Loading OsxFuse Kernel was successful'));
      this.callHandlers('success');
    });
  }

  stop() {
    if (this.childProcess) {
      this.childProcess.kill();
      this.childProcess = null;
    }
  }
}

module.exports = FuseInstallerProcess;
