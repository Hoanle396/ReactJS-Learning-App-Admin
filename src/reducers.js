import { combineReducers } from 'redux';
import userReducer from './actions/authActions';

const rootReducer = combineReducers({
  auth:userReducer
});

export default rootReducer;