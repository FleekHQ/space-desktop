import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'generateKeyPair';
const EVENT_FORCE_PREFIX = `${EVENT_PREFIX}WithForce`;

const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const FETCH_FORCE_EVENT = `${EVENT_FORCE_PREFIX}:fetch`;
const ERROR_FORCE_EVENT = `${EVENT_FORCE_PREFIX}:error`;
const SUCCESS_FORCE_EVENT = `${EVENT_FORCE_PREFIX}:success`;

/* eslint-disable no-console */
const registerGenerateKeyPairEvents = () => {
  ipcRenderer.on(SUCCESS_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(SUCCESS_EVENT, event, payload);
  });

  ipcRenderer.on(SUCCESS_FORCE_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(SUCCESS_FORCE_EVENT, event, payload);
  });

  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(ERROR_EVENT, event, payload);
  });

  ipcRenderer.on(ERROR_FORCE_EVENT, (event, payload) => {
    // DO Something with the response (dispatch to redux)
    console.log(ERROR_FORCE_EVENT, event, payload);
  });
};

export const generateKeyPair = (payload) => ipcRenderer.send(FETCH_EVENT, payload);

export const generateKeyPairWithForce = (payload) => ipcRenderer.send(FETCH_FORCE_EVENT, payload);

export default registerGenerateKeyPairEvents;