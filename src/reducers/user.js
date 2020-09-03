import electronStore from '@electron-store';
import omit from 'lodash/omit';
import { SIGNIN_ACTION_TYPES } from './auth/signin';
import { SIGNUP_ACTION_TYPES } from './auth/signup';
import { RESTORE_KEYS_MNEMONIC_ACTION_TYPES } from './auth/restore-keys-mnemonic';

export const UPDATE_USER = 'UPDATE_USER';
export const USER_ACTION_TYPES = {
  UPDATE_USER: 'UPDATE_USER',
  ON_USER_LOGOUT: 'ON_USER_LOGOUT',
  ON_UPDATE_AVATAR: 'ON_UPDATE_AVATAR',
  ON_UPDATE_AVATAR_ERROR: 'ON_UPDATE_AVATAR_ERROR',
  ON_UPDATE_AVATAR_SUCCESS: 'ON_UPDATE_AVATAR_SUCCESS',
  FETCHING_IDENTITY_ERROR: 'USER_ACTION_FETCHING_IDENTITY_ERROR',
};

let user;
const USER_KEY = '_u';

try {
  user = JSON.parse(electronStore.get(USER_KEY));
} catch (error) {
  user = null;
}

const writeUser = (state, userInfo) => {
  const dataToStore = omit(state, ['fetchingIdentityError', 'uploadingAvatar']);
  const newUserState = {
    username: '',
    ...(dataToStore),
    ...userInfo,
  };

  electronStore.set(USER_KEY, JSON.stringify(newUserState));

  return newUserState;
};

export default (state = user, action) => {
  switch (action.type) {
    case SIGNIN_ACTION_TYPES.ON_SUBMIT_SUCCESS:
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS:
    case RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      return writeUser(state, action.user);
    }

    case UPDATE_USER: {
      return writeUser(state, action.user);
    }

    case USER_ACTION_TYPES.ON_USER_LOGOUT: {
      electronStore.clear();
      return null;
    }

    case USER_ACTION_TYPES.ON_UPDATE_AVATAR: {
      return {
        ...state,
        uploadingAvatar: true,
      };
    }

    case USER_ACTION_TYPES.ON_UPDATE_AVATAR_ERROR: {
      return {
        ...state,
        uploadingAvatar: false,
      };
    }

    case USER_ACTION_TYPES.ON_UPDATE_AVATAR_SUCCESS: {
      return writeUser(state, {
        ...action.user,
        uploadingAvatar: false,
      });
    }

    case USER_ACTION_TYPES.FETCHING_IDENTITY_ERROR: {
      return {
        ...state,
        fetchingIdentityError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
