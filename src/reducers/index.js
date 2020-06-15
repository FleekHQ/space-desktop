import { combineReducers } from 'redux';

import userReducer from './user';
import storageReducer from './storage';
import modalReducer from './modal';

const rootReducer = combineReducers({
  user: userReducer,
  storage: storageReducer,
  modal: modalReducer,
});

export default rootReducer;
