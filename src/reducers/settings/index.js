import { combineReducers } from 'redux';

import usageReducer from './usage';

const authReducer = combineReducers({
  usage: usageReducer,
});

export default authReducer;
