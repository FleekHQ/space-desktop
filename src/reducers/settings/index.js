import { combineReducers } from 'redux';

import usageReducer from './usage';
import accountReducer from './account';
import spaceProReducer from './space-pro';

const settingsReducer = combineReducers({
  usage: usageReducer,
  account: accountReducer,
  spacePro: spaceProReducer,
});

export default settingsReducer;
