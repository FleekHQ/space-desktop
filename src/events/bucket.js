import get from 'lodash/get';
import { ipcRenderer } from 'electron';
import { bucketPresenter } from '@utils';

import { JOIN_ACTION_TYPES } from '@reducers/join';
import {
  STORE_BUCKETS,
  SET_ERROR_STATE,
  SET_LOADING_STATE,
} from '@reducers/storage';

import store from '../store';

const EVENT_PREFIX = 'bucket';
const LIST_FETCH_EVENT = `${EVENT_PREFIX}:list:fetch`;
const LIST_ERROR_EVENT = `${EVENT_PREFIX}:list:error`;
const LIST_SUCCESS_EVENT = `${EVENT_PREFIX}:list:success`;
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

  /* List buckets events */
  ipcRenderer.on(LIST_SUCCESS_EVENT, (event, payload) => {
    const bucketsList = get(payload, 'bucketsList', []) || [];
    const buckets = bucketsList.map((obj) => bucketPresenter(obj));

    store.dispatch({
      payload: buckets,
      type: STORE_BUCKETS,
    });
  });

  ipcRenderer.on(LIST_ERROR_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: SET_ERROR_STATE,
    });
  });
  /* Finish List buckets events */
};

export const joinBucket = (payload) => {
  ipcRenderer.send(JOIN_EVENT, payload);
};

export const fetchBuckets = () => {
  store.dispatch({
    payload: true,
    type: SET_LOADING_STATE,
  });

  ipcRenderer.send(LIST_FETCH_EVENT);
};

export default registerBucketEvents;
