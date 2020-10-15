import moment from 'moment';
import get from 'lodash/get';
import { ipcRenderer } from 'electron';

import store from '../store';
import { SPACE_PRO_ACTION_TYPES } from '../reducers/settings/space-pro';

const EVENT_PREFIX = 'billing';
const GET_ACCOUNT_EVENT = `${EVENT_PREFIX}:account`;
const GET_ACCOUNT_ERROR_EVENT = `${EVENT_PREFIX}:account:error`;
const GET_ACCOUNT_SUCCESS_EVENT = `${EVENT_PREFIX}:account:success`;

const registerWalletEvents = () => {
  ipcRenderer.on(GET_ACCOUNT_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when trying to get account: ', error.message);

    store.dispatch({
      error: error.message,
      type: SPACE_PRO_ACTION_TYPES.GET_ACCOUNT_ERROR,
    });
  });

  ipcRenderer.on(GET_ACCOUNT_SUCCESS_EVENT, (_, payload) => {
    const amount = get(payload, 'credits', 0) || 0;
    const isActive = !!get(payload, 'billingMode');
    const billingPeriodEnd = get(payload, 'billingPeriodEnd');

    let paymentType = null;
    const plan = isActive ? 'Space Pro' : 'Basic';
    const billDate = isActive ? moment(billingPeriodEnd).format('MM/DD/YYYY') : '';

    if (isActive) {
      if (payload.billingMode === 'credits') {
        paymentType = 'crypto';
      } else {
        paymentType = 'crypto';
      }
    }

    // TODO: for crypto subscription
    const credits = {
      amount: amount / 100, // amount is on cents
      severity: 'success', // should depend on time remaining
      timeRemaining: '30 days', // not sure how this will be estimated
    };

    store.dispatch({
      type: SPACE_PRO_ACTION_TYPES.GET_ACCOUNT_SUCCESS,
      planInfo: {
        plan,
        credits,
        isActive,
        billDate,
        paymentType,
      },
    });
  });
};

export const getAccount = () => {
  store.dispatch({
    type: SPACE_PRO_ACTION_TYPES.GET_ACCOUNT,
  });

  ipcRenderer.send(GET_ACCOUNT_EVENT);
};

export default registerWalletEvents;
