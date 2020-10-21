import get from 'lodash/get';
import { ipcRenderer } from 'electron';
import { objectPresenter } from '@utils';
import {
  STORE_DIR,
  STORE_OBJECTS,
  SET_LOADING_STATE_BUCKET,
  SET_ERROR_BUCKET,
  SET_LOADING_STATE,
} from '@reducers/storage';
import { OPEN_PUBLIC_FILE_ACTION_TYPES } from '@reducers/open-public-file';

import store from '../store';

const EVENT_PREFIX = 'objects';
const OPEN_EVENT = `${EVENT_PREFIX}:open`;
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const FETCH_DIR_EVENT = `${EVENT_PREFIX}:fetchDir`;
const SUCCESS_DIR_EVENT = `${EVENT_PREFIX}:successDir`;
const FETCH_SHARED_OBJECTS_EVENT = `${EVENT_PREFIX}:fetchShared`;
const FETCH_SHARED_OBJECTS_ERROR_EVENT = `${EVENT_PREFIX}:fetchShared:error`;
const FETCH_SHARED_OBJECTS_SUCCESS_EVENT = `${EVENT_PREFIX}:fetchShared:success`;
const OPEN_PUBLIC_FILE_EVENT = `${EVENT_PREFIX}:openPublicFile`;
const OPEN_PUBLIC_FILE_ERROR_EVENT = `${EVENT_PREFIX}:openPublicFile:error`;
const OPEN_PUBLIC_FILE_SUCCESS_EVENT = `${EVENT_PREFIX}:openPublicFile:success`;

const registerObjectsEvents = () => {
  ipcRenderer.on(SUCCESS_EVENT, (event, payload) => {
    const entries = get(payload, 'entries', []) || [];
    const objects = entries.map((obj) => objectPresenter(obj));

    store.dispatch({
      payload: false,
      type: SET_LOADING_STATE,
    });

    store.dispatch({
      payload: objects,
      type: STORE_OBJECTS,
    });
  });

  ipcRenderer.on(SUCCESS_DIR_EVENT, (event, payload) => {
    const entries = get(payload, 'entries', []) || [];
    const objects = entries.map((obj) => objectPresenter(obj));
    store.dispatch({
      payload: {
        loading: false,
        bucket: payload.bucket,
      },
      type: SET_LOADING_STATE_BUCKET,
    });

    store.dispatch({
      payload: objects,
      type: STORE_DIR,
    });
  });

  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: SET_ERROR_BUCKET,
    });
  });

  ipcRenderer.on(FETCH_SHARED_OBJECTS_SUCCESS_EVENT, (event, payload) => {
    const entries = get(payload, 'objects.items', []) || [];
    const objects = entries.map((obj) => objectPresenter(obj));

    store.dispatch({
      payload: {
        loading: false,
        bucket: payload.bucket,
      },
      type: SET_LOADING_STATE_BUCKET,
    });

    store.dispatch({
      payload: objects,
      type: STORE_DIR,
    });
  });

  ipcRenderer.on(FETCH_SHARED_OBJECTS_ERROR_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: SET_ERROR_BUCKET,
    });
  });

  ipcRenderer.on(OPEN_PUBLIC_FILE_ERROR_EVENT, (event, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when trying to opening a public file: ', error.message);

    store.dispatch({
      error: error.message,
      type: OPEN_PUBLIC_FILE_ACTION_TYPES.ON_ERROR,
    });
  });

  ipcRenderer.on(OPEN_PUBLIC_FILE_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      location: payload.action,
      type: OPEN_PUBLIC_FILE_ACTION_TYPES.ON_SUCCESS,
    });
  });
};

export const fetchSharedObjects = (seek = '', limit = 100) => {
  store.dispatch({
    payload: {
      loading: true,
      bucket: 'shared-with-me',
    },
    type: SET_LOADING_STATE_BUCKET,
  });
  ipcRenderer.send(FETCH_SHARED_OBJECTS_EVENT, { seek, limit });
};

export const fetchObjects = (bucket = 'personal') => {
  store.dispatch({
    payload: true,
    type: SET_LOADING_STATE,
  });

  ipcRenderer.send(FETCH_EVENT, { bucket });
};

export const fetchDir = (path = '', bucket = 'personal', fetchSubFolders = true) => {
  store.dispatch({
    payload: {
      loading: true,
      bucket,
    },
    type: SET_LOADING_STATE_BUCKET,
  });

  ipcRenderer.send(FETCH_DIR_EVENT, { path, bucket, fetchSubFolders });
};

export const openObject = ({
  path,
  dbId,
  name,
  ipfsHash,
  isPublicLink = false,
  bucket = 'personal',
}) => {
  if (isPublicLink) {
    ipcRenderer.send(OPEN_PUBLIC_FILE_EVENT, {
      filename: name,
      fileCid: ipfsHash,
    });
    return;
  }

  ipcRenderer.send(OPEN_EVENT, {
    path,
    bucket,
    ...(dbId && { dbId }),
  });
};

export const openPublicFile = (payload) => {
  store.dispatch({
    type: OPEN_PUBLIC_FILE_ACTION_TYPES.ON_OPEN,
  });
  ipcRenderer.send(OPEN_PUBLIC_FILE_EVENT, payload);
};

export default registerObjectsEvents;
