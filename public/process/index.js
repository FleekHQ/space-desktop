const path = require('path');
const chalk = require('chalk');
const get = require('lodash/get');
const isDev = require('electron-is-dev');
const { spawn } = require('child_process');

const { DAEMON_PATH } = process.env;

class DaemonProcess {
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
    this.handlers[key].forEach((handler) => handler(args));
  }

  start() {
    if (this.childProcess) return;

    const daemonPath = isDev
      ? DAEMON_PATH
      : path.join(process.resourcesPath, 'space');

    this.childProcess = spawn(daemonPath);

    if (isDev) {
      this.childProcess.stdout.on('data', (data) => {
        console.log(chalk.green(data));

        if (data.includes('level=debug msg="Starting textile threadsc listener[]')) {
          this.callHandlers('ready');
        }
      });

      this.childProcess.stderr.on('data', (data) => {
        console.error(chalk.red(data));
      });
    }

    this.callHandlers('pending');
  }

  stop() {
    if (this.childProcess) {
      this.childProcess.kill();
      this.childProcess = null;
    }
  }
}

module.exports = DaemonProcess;
