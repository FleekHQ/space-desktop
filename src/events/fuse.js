import { ipcRenderer } from 'electron';

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

/* eslint-disable no-console */
const registerFuseEvents = () => {
  ipcRenderer.on(DOWNLOAD_FUSE_ERROR_EVENT, (event, error) => {
    console.error('DOWNLOAD_FUSE_ERROR_EVENT', error);
  });

  ipcRenderer.on(DOWNLOAD_FUSE_SUCCESS_EVENT, () => {
    console.log('DOWNLOAD_FUSE_SUCCESS_EVENT');
  });

  ipcRenderer.on(UPDATE_PROGRESS_DOWNLOAD_FUSE_EVENT, (event, payload) => {
    console.log('UPDATE_PROGRESS_DOWNLOAD_FUSE_EVENT', payload);
  });
};

export const installFuse = () => new Promise((resolve, reject) => {
  ipcRenderer.send(INSTALL_FUSE_EVENT);

  ipcRenderer.on(INSTALL_FUSE_ERROR_EVENT, (event, error) => {
    reject(error);
  });

  ipcRenderer.on(INSTALL_FUSE_SUCCESS_EVENT, (event, result) => {
    resolve(result);
  });
});

export const deleteFuseInstaller = () => new Promise((resolve, reject) => {
  ipcRenderer.send(DELETE_FUSE_INSTALLER);

  ipcRenderer.on(DELETE_FUSE_INSTALLER_ERROR, (event, err) => {
    reject(err);
  });

  ipcRenderer.on(DELETE_FUSE_INSTALLER_SUCCESS, () => {
    resolve();
  });
});

export const downloadFuse = () => ipcRenderer.send(DOWNLOAD_FUSE_EVENT);

export default registerFuseEvents;
