export const FETCH_USAGE_INFO = 'FETCH_USAGE_INFO';
export const FETCH_USAGE_INFO_SUCCESS = 'FETCH_USAGE_INFO_SUCCESS';
export const FETCH_USAGE_INFO_ERROR = 'FETCH_USAGE_INFO_ERROR';
export const TOGGLE_BACKUP = 'TOGGLE_BACKUP';
export const TOGGLE_BACKUP_SUCCESS = 'TOGGLE_BACKUP_SUCCESS';
export const TOGGLE_BACKUP_ERROR = 'TOGGLE_BACKUP_ERROR';

const defaultState = {
  planName: 'Free plan',
  localUsage: {
    storage: 0,
    bandwidth: 0,
    combinedUsage: 0,
  },
  backupUsage: {
    storage: 0,
    bandwidth: 0,
    combinedUsage: 0,
    limit: 0,
  },
  backupEnabled: undefined, // to show optimistic response
  backupEnabledPrevValue: undefined, // if error, revert to old value
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_USAGE_INFO: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case FETCH_USAGE_INFO_ERROR: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case FETCH_USAGE_INFO_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case TOGGLE_BACKUP: {
      return {
        ...state,
        backupEnabledPrevValue: state.backupEnabled,
        backupEnabled: action.payload,
      };
    }

    case TOGGLE_BACKUP_ERROR: {
      return {
        ...state,
        backupEnabledPrevValue: undefined,
        backupEnabled: state.backupEnabledPrevValue,
      };
    }

    case TOGGLE_BACKUP_SUCCESS: {
      return {
        ...state,
        backupEnabledPrevValue: undefined,
      };
    }

    default: {
      return state;
    }
  }
};
