export const TOGGLE_BACKUP = 'TOGGLE_BACKUP';
export const TOGGLE_BACKUP_SUCCESS = 'TOGGLE_BACKUP_SUCCESS';
export const TOGGLE_BACKUP_ERROR = 'TOGGLE_BACKUP_ERROR';

const defaultState = {
  backup: undefined, // to show optimistic response
  backupPrevValue: undefined, // if error, revert to old value
};

export default (state = defaultState, action) => {
  switch (action.type) {
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
