import { ipcRenderer } from 'electron';

import store from '../store';
import { JOIN_ACTION_TYPES } from '../reducers/join';

const EVENT_PREFIX = 'bucket';
const JOIN_EVENT = `${EVENT_PREFIX}:join`;
const JOIN_ERROR_EVENT = `${EVENT_PREFIX}:join:error`;
const JOIN_SUCCESS_EVENT = `${EVENT_PREFIX}:join:success`;

const registerBucketEvents = () => {
  /* Join events */
  ipcRenderer.on(JOIN_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when joining the bucket', error.message);
    store.dispatch({
      error: error.message,
      type: JOIN_ACTION_TYPES.ON_JOIN_ERROR,
    });
  });

  ipcRenderer.on(JOIN_SUCCESS_EVENT, () => {
    store.dispatch({
      type: JOIN_ACTION_TYPES.ON_JOIN_SUCCESS,
    });
  });
  /* Finish Join events */
};

export const joinBucket = (payload) => {
  ipcRenderer.send(JOIN_EVENT, payload);
};

export default registerBucketEvents;
