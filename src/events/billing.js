import { ipcRenderer } from 'electron';

import store from '../store';
import { BILLING_ACTION_TYPES } from '../reducers/billing';

const EVENT_PREFIX = 'billing';
const GET_BILLING_INFO_EVENT = `${EVENT_PREFIX}:get_billing_info`;
const GET_BILLING_INFO_SUCCESS_EVENT = `${EVENT_PREFIX}:get_billing_info:success`;
const GET_BILLING_INFO_ERROR_EVENT = `${EVENT_PREFIX}:get_billing_info:error`;

const registerBillingEvents = () => {
  ipcRenderer.on(GET_BILLING_INFO_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      type: BILLING_ACTION_TYPES.GET_BILLING_INFO_SUCCESS,
      payload,
    });
  });

  ipcRenderer.on(GET_BILLING_INFO_ERROR_EVENT, (event, message) => {
    store.dispatch({
      type: BILLING_ACTION_TYPES.GET_BILLING_INFO_ERROR,
      error: message,
    });
  });
};

export const getBillingInfo = () => {
  store.dispatch({
    type: BILLING_ACTION_TYPES.GET_BILLING_INFO,
  });

  ipcRenderer.send(GET_BILLING_INFO_EVENT);
};

export default registerBillingEvents;
