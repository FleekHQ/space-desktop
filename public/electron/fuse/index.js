const path = require('path');
const chalk = require('chalk');
const get = require('lodash/get');
const { spawn, exec } = require('child_process');

const installerName = 'Space FUSE Installer';

class FuseInstallerProcess {
  constructor() {
    this.childProcess = null;
    this.handlers = {
      ready: [],
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

    if (process.platform !== 'darwin') {
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
      this.callHandlers('error');
    });

    this.callHandlers('pending');
  }

  loadFuseKernel() {
    // eslint-disable-next-line no-console
    console.log(chalk.blue('Loading OsxFuse Kernel'));
    exec('/Library/Filesystems/osxfuse.fs/Contents/Resources/load_osxfuse', (err, stdout) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(chalk.red(err.message));
        this.callHandlers('error');
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
