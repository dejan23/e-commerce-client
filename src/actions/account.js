import axios from 'axios';
import {history} from '../routers/AppRouter';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  CLEAR_ALERT,
  SUCCESS_MESSAGE
} from './types';

const ROOT_URL = process.env.ROOT_URL || 'http://localhost:5000';

export function loginUser({email, password}) {
  return function(dispatch) {
    // Submit email/password to the server
    return axios
      .post(`${ROOT_URL}/auth/login`, {email, password})
      .then(async (response) => {
        await localStorage.setItem('username', response.data.username);
        // if req is good...
        // - update state to indicate user is auth
        await dispatch({
          type: AUTH_USER,
          payload: email
        });
        // - save the JWT token
        await localStorage.setItem('token', response.data.token);
        // - redirect to the special page
        history.push('/');
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('username');
  return {type: UNAUTH_USER};
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function successMessage(success) {
  return {
    type: SUCCESS_MESSAGE,
    payload: success
  };
}

export function registerUser(formData) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/accounts/register`, formData)
      .then(response => {
        history.push('/');
        console.log('success')
      })
      .catch(error => console.log(error.response.data.message));
  };
}

export function verifyUser(token) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/auth/verify/${token}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function resendToken(email) {
  return function(dispatch) {
    axios
      .put(`${ROOT_URL}/auth/resendToken`, {email})
      .then(response => {
        history.push('/auth/resend/success');
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function clearAlert() {
  return {type: CLEAR_ALERT};
}

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/feature`, {
        headers: {authorization: localStorage.getItem('token')}
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
