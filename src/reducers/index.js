import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';

const rootReducer = {
  auth: authReducer
};

export default rootReducer;
