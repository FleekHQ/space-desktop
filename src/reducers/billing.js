export const BILLING_ACTION_TYPES = {
  GET_BILLING_INFO: 'BILLING_GET_BILLING_INFO',
  GET_BILLING_INFO_SUCCESS: 'BILLING_GET_BILLING_INFO_SUCCESS',
  GET_BILLING_INFO_ERROR: 'BILLING_GET_BILLING_INFO_ERROR',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  data: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case BILLING_ACTION_TYPES.GET_BILLING_INFO: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case BILLING_ACTION_TYPES.GET_BILLING_INFO_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case BILLING_ACTION_TYPES.GET_BILLING_INFO_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
