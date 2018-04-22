import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  form: formReducer,
  product: productReducer,
  user: userReducer
};

export default rootReducer;
