/* eslint-disable */
import { ipcRenderer, remote } from 'electron';
import { objectPresenter, createNewObject } from '@utils';
import {
  SET_UPLOAD_SUCCESS_STATE,
  SET_UPLOAD_ERROR_STATE,
  UPDATE_OBJECTS,
  ADD_OBJECT,
} from '@reducers/storage';

import store from '../store';

const EVENT_PREFIX = 'addItemsSubscribe';
const SUBSCRIBE_START_EVENT = `${EVENT_PREFIX}:start`;
const SUBSCRIBE_ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUBSCRIBE_SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerAddItemsSubscribeEvents = () => {
  ipcRenderer.on(SUBSCRIBE_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: SET_UPLOAD_SUCCESS_STATE,
    });
    store.dispatch({
      type: ADD_OBJECT,
      payload: objectPresenter(payload.object),
    });
  });

  ipcRenderer.on(SUBSCRIBE_ERROR_EVENT, (event, error) => {
    store.dispatch({
      payload: error,
      type: SET_UPLOAD_ERROR_STATE,
    });
  });
};


const getFileStats = async (sourcePath) => new Promise((resolve, reject) => {
  const fs = remote.require('fs');
  fs.stat(sourcePath, {}, (err, stats) => {
    console.log(sourcePath, stats);
    if (err) {
      reject(err);
    }
    resolve({
      sourcePath,
      size: stats.size,
      isDir: stats.isDirectory(),
    });
  });
});

/**
 * @param {Object} payload
 * @param {string} payload.targetPath
 * @param {Array<string>} payload.sourcePaths
 */
export const addItems = async (payload) => {
  const id = new Date().getTime();
  const statsPromises = payload.sourcePaths.map((sourcePath) => getFileStats(sourcePath));

  Promise.all(statsPromises)
    .then((data) => {
      store.dispatch({
        type: UPDATE_OBJECTS,
        payload: [
          /* eslint-disable-next-line max-len */
          ...data.map((stats) => {
            const object = createNewObject({
                targetPath: payload.targetPath,
                bucket: 'personal',
                ...stats
              });
            return object;
          })
        ],
      });
      // ipcRenderer.send(SUBSCRIBE_START_EVENT, { id, payload });
    })
    .catch((error) => {
      console.error(error);
    });
};

export default registerAddItemsSubscribeEvents;
