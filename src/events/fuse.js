import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'fuse';
const INSTALL_FUSE_EVENT = `${EVENT_PREFIX}:install`;
const INSTALL_FUSE_ERROR_EVENT = `${INSTALL_FUSE_EVENT}:error`;
const INSTALL_FUSE_SUCCESS_EVENT = `${INSTALL_FUSE_EVENT}:success`;

/* eslint-disable import/prefer-default-export */
export const installFuse = () => new Promise((resolve, reject) => {
  ipcRenderer.send(INSTALL_FUSE_EVENT);

  ipcRenderer.on(INSTALL_FUSE_ERROR_EVENT, (event, error) => {
    reject(error);
  });

  ipcRenderer.on(INSTALL_FUSE_SUCCESS_EVENT, (event, result) => {
    resolve(result);
  });
});
