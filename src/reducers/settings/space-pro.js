export const SPACE_PRO_ACTION_TYPES = {
  GET_ACCOUNT: 'SPACE_PRO_GET_ACCOUNT',
  GET_ACCOUNT_ERROR: 'SPACE_PRO_GET_ACCOUNT_ERROR',
  GET_ACCOUNT_SUCCESS: 'SPACE_PRO_GET_ACCOUNT_SUCCESS',
};

const defaultState = {
  error: null,
  success: false,
  loading: false,
  planInfo: {
    billDate: '',
    plan: 'basic',
    isActive: false,
    paymentType: null,
    credits: {
      amount: 0,
    },
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SPACE_PRO_ACTION_TYPES.GET_ACCOUNT: {
      return {
        ...state,
        error: null,
        loading: true,
        success: false,
      };
    }
    case SPACE_PRO_ACTION_TYPES.GET_ACCOUNT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case SPACE_PRO_ACTION_TYPES.GET_ACCOUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        planInfo: {
          ...action.planInfo,
        },
      };
    }

    default: {
      return state;
    }
  }
};
