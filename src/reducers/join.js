const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: true,
};

export const JOIN_ACTION_TYPES = {
  ON_JOIN_ERROR: 'ON_JOIN_ERROR',
  ON_JOIN_SUCCESS: 'ON_JOIN_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case JOIN_ACTION_TYPES.ON_JOIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case JOIN_ACTION_TYPES.ON_JOIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    default: {
      return state;
    }
  }
};
