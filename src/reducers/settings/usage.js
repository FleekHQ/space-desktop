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
  backup: undefined, // to show optimistic response
  backupPrevValue: undefined, // if error, revert to old value
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
        backupPrevValue: state.backup,
        backup: action.payload,
      };
    }

    case TOGGLE_BACKUP_ERROR: {
      return {
        ...state,
        backupPrevValue: undefined,
        backup: state.backupPrevValue,
      };
    }

    case TOGGLE_BACKUP_SUCCESS: {
      return {
        ...state,
        backupPrevValue: undefined,
      };
    }

    default: {
      return state;
    }
  }
};
