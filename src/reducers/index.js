import { combineReducers } from 'redux';

import authReducer from './auth';
import userReducer from './user';
import storageReducer from './storage';
import modalsReducer from './modals';
import joinReducer from './join';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  storage: storageReducer,
  modals: modalsReducer,
  join: joinReducer,
});

export default rootReducer;
