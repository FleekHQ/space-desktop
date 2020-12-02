import { ipcRenderer } from 'electron';

import store from '../store';
import { USAGE_METRICS_ACTION_TYPES } from '../reducers/settings/usage';

const EVENT_PREFIX = 'usage';
const GET_CURRENT_USAGE_EVENT = `${EVENT_PREFIX}:currentUsage`;
const GET_CURRENT_USAGE_ERROR_EVENT = `${EVENT_PREFIX}:currentUsage:error`;
const GET_CURRENT_USAGE_SUCCESS_EVENT = `${EVENT_PREFIX}:currentUsage:success`;
const GET_HISTORY_USAGE_EVENT = `${EVENT_PREFIX}:historyUsage`;
const GET_HISTORY_USAGE_ERROR_EVENT = `${EVENT_PREFIX}:historyUsage:error`;
const GET_HISTORY_USAGE_SUCCESS_EVENT = `${EVENT_PREFIX}:historyUsage:success`;

const registerAccountEvents = () => {
  ipcRenderer.on(GET_CURRENT_USAGE_ERROR_EVENT, (event, { message }) => {
    store.dispatch({
      type: USAGE_METRICS_ACTION_TYPES.GET_CURRENT_ERROR,
      error: message,
    });
  });

  ipcRenderer.on(GET_CURRENT_USAGE_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      type: USAGE_METRICS_ACTION_TYPES.GET_CURRENT_SUCCESS,
      payload,
    });
  });

  ipcRenderer.on(GET_HISTORY_USAGE_ERROR_EVENT, (event, { message }) => {
    store.dispatch({
      type: USAGE_METRICS_ACTION_TYPES.GET_HISTORY_ERROR,
      error: message,
    });
  });

  ipcRenderer.on(GET_HISTORY_USAGE_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      type: USAGE_METRICS_ACTION_TYPES.GET_HISTORY_SUCCESS,
      payload,
    });
  });
};

export const getCurrentUsage = () => {
  store.dispatch({
    type: USAGE_METRICS_ACTION_TYPES.GET_CURRENT,
  });
  ipcRenderer.send(GET_CURRENT_USAGE_EVENT);
};

export const getHistoryUsage = () => {
  store.dispatch({
    type: USAGE_METRICS_ACTION_TYPES.GET_HISTORY,
  });
  ipcRenderer.send(GET_HISTORY_USAGE_EVENT);
};

export default registerAccountEvents;
