export const USAGE_METRICS_ACTION_TYPES = {
  GET_CURRENT: 'GET_CURRENT',
  GET_CURRENT_ERROR: 'GET_CURRENT_ERROR',
  GET_CURRENT_SUCCESS: 'GET_CURRENT_SUCCESS',
  GET_HISTORY: 'GET_HISTORY',
  GET_HISTORY_SUCCESS: 'GET_HISTORY_SUCCESS',
  GET_HISTORY_ERROR: 'GET_HISTORY_ERROR',
};

const DEFAULT_STATE = {
  current: {
    loading: false,
    error: null,
    data: {},
  },
  history: {
    loading: false,
    error: null,
    data: [],
  },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USAGE_METRICS_ACTION_TYPES.GET_CURRENT: {
      return {
        ...state,
        current: {
          ...state.current,
          error: null,
          loading: true,
        },
      };
    }
    case USAGE_METRICS_ACTION_TYPES.GET_CURRENT_ERROR: {
      return {
        ...state,
        current: {
          ...state.current,
          error: action.error,
          loading: false,
        },
      };
    }
    case USAGE_METRICS_ACTION_TYPES.GET_CURRENT_SUCCESS: {
      return {
        ...state,
        current: {
          ...state.current,
          data: action.payload,
          loading: false,
        },
      };
    }

    case USAGE_METRICS_ACTION_TYPES.GET_HISTORY: {
      return {
        ...state,
        history: {
          ...state.history,
          error: null,
          loading: true,
        },
      };
    }

    case USAGE_METRICS_ACTION_TYPES.GET_HISTORY_ERROR: {
      return {
        ...state,
        history: {
          ...state.history,
          error: action.error,
          loading: false,
        },
      };
    }

    case USAGE_METRICS_ACTION_TYPES.GET_HISTORY_SUCCESS: {
      return {
        ...state,
        history: {
          ...state.history,
          data: action.payload,
          loading: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};
