require('dotenv').config();
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const path = require('path');
const { app, Tray } = require('electron');
const isDev = require('electron-is-dev');

const DaemonProcess = require('./electron/daemon');
const registerEvents = require('./electron/events');
const createMainWindow = require('./electron/window/main');
const { getMenuOptions, trayIcon } = require('./electron/tray-menu');

let goTo;
let appIcon;
let mainWindow;
let destroyStream = () => {};

const daemon = new DaemonProcess();

const enableDevDaemon = process.env.DEV_DAEMON === 'true';

/**
 * App events
 */
app.on('window-all-closed', () => {
  // eslint-disable-next-line no-console
  console.log('All windows are closed...');
  destroyStream();

  if (process.platform !== 'darwin' || app.newUpdate) {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();

    destroyStream = registerEvents({
      app,
      isDev,
      mainWindow,
    });
  } else {
    mainWindow.show();
  }
});

app.on('before-quit', () => {
  // eslint-disable-next-line no-console
  console.log('App is quiting...');
  daemon.stop();
  app.quitting = true;
});

app.on('ready', () => {
  mainWindow = createMainWindow();

  const contextMenu = getMenuOptions(app, 'pending');

  appIcon = new Tray(trayIcon);
  appIcon.setContextMenu(contextMenu);
});

app.on('open-url', (event, data) => {
  event.preventDefault();

  goTo = decodeURIComponent(data.replace('space://', ''));

  if (mainWindow) {
    mainWindow.loadURL(isDev
      ? `http://localhost:3000/#/${goTo}`
      : `file://${path.join(__dirname, `../build/index.html#/${goTo}`)}`);
  }
});

app.setAsDefaultProtocolClient('space');

/**
 * Daemon Event handlers
 */
daemon.on('ready', () => {
  let url = isDev
    ? 'http://localhost:3000/'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  if (goTo) {
    url += `#/${goTo}`;
  }

  mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    if (app.quitting || app.newUpdate) {
      mainWindow = null;
    } else {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  destroyStream = registerEvents({
    app,
    isDev,
    mainWindow,
  });

  if (appIcon) {
    const contextMenu = getMenuOptions(app, 'ready');
    appIcon.setContextMenu(contextMenu);
  }
});

/**
 * Run Daemon
 */
if (isDev && !enableDevDaemon) {
  daemon.startDev();
  return;
}
daemon.start();
