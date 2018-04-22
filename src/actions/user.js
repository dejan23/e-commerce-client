import axios from 'axios';
import {history} from '../routers/AppRouter';
import { formatListing } from './helper';

export const successMessage = (message) => ({
    type: 'SUCCESS_MESSAGE',
    payload: message
})

export const clearMessage2 = () => ({
    type: 'CLEAR_MESSAGE',
    payload: null
})

// SET_USER
export const setUser = user => ({
  type: 'SET_USER',
  payload: user
});

export const userIsLoading = (bool) => ({
  type: 'USER_IS_LOADING',
  payload: bool
});

export const startSetUser = username => {
  return dispatch => {
    dispatch(userIsLoading(true))
    axios.get(`${process.env.ROOT_URL}/api/accounts/${username}`)
      .then(response => {
        dispatch(setUser(response.data));
      })
      .catch(error => {
        dispatch(userIsLoading(false))
      })
  };
};

// SET_USERS ALL
export const setUsers = users => ({
  type: 'SET_USERS',
  payload: users
});

export const startSetUsers = () => {
  return dispatch => {
    dispatch(userIsLoading(true))
    axios.get(`${process.env.ROOT_URL}/users`)
      .then(response => {
        dispatch(userIsLoading(false))
        dispatch(setUsers(response.data));
      })
      .catch(error => {
        dispatch(userIsLoading(false))
      })
  };
};

// SET_USER_UPDATE
export const setUserUpdate = user => ({
  type: 'SET_USER_UPDATE',
  payload: user
});

export const startSetUserUpdate = (formData) => {
  return async dispatch => {
    return axios.patch(`${process.env.ROOT_URL}/api/accounts/profile`, formData, {
      headers: {authorization: localStorage.getItem('token')}
    })
    .then(async (response) => {
      await dispatch(setUserUpdate(response.data.user));
      await localStorage.setItem('username', response.data.user.username);
      const localUsername = await localStorage.getItem('username');
      dispatch(successMessage(response.data.message))
    });
  };
};

export const setUserProfile = profile => ({
  type: 'SET_USER_PROFILE',
  payload: profile
});

export function startSetUserProfile() {
  return function(dispatch) {
    dispatch(userIsLoading(true))
    return axios.get(`${process.env.ROOT_URL}/api/accounts/profile`, {
      headers: {authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch(setUserProfile(response.data.user))
    })
    .catch(error => {
      dispatch(userIsLoading(false))
    });
  };
}

export const setCategories = categories => ({
  type: 'SET_CATEGORIES',
  payload: categories
});

export const startSetCategories = () => {
  return dispatch => {
    axios.get(`${process.env.ROOT_URL}/api/categories`)
      .then(response => {
        dispatch(setCategories(response.data.categories))
      })
  };
};

export const setAddProduct = product => ({
  type: 'ADD_PRODUCT',
  payload: product
});

export function startAddProduct(formData) {
  return dispatch => {
    const formedData = formatListing(formData);
    axios.post(`${process.env.ROOT_URL}/api/products`, formedData,
        {
          headers: {authorization: localStorage.getItem('token')}
        }
      )
      .then(response => {
        console.log(response.data)
      })
  };
}

export const productsIsLoading = (bool) => ({
  type: 'PRODUCTS_IS_LOADING',
  payload: bool
});

export const setMyProducts = products => ({
  type: 'MY_PRODUCTS',
  payload: products
});

export function startSetMyProducts() {
  return dispatch => {
    dispatch(productsIsLoading(true))
    axios.get(`${process.env.ROOT_URL}/api/my-products`,
        {
          headers: {authorization: localStorage.getItem('token')}
        }
      )
      .then(response => {
        dispatch(setMyProducts(response.data.products))
      })
  };
}

export const setUserProducts = products => ({
  type: 'USER_PRODUCTS',
  payload: products
});

export function startSetUserProducts(username) {
  return dispatch => {
    dispatch(productsIsLoading(true))
    axios.get(`${process.env.ROOT_URL}/api/user-products/${username}`)
      .then(response => {
        dispatch(setUserProducts(response.data.products))
      })
  };
}

// DELETE_PRODUCT
export const setDeleteProduct = (id) => ({
  type: 'DELETE_PRODUCT',
  payload: id
});

export const startDeleteProduct = (id) => {
  console.log(id)
  return dispatch => {
    axios.delete(`${process.env.ROOT_URL}/api/my-product`, {
        data: {id: id},
        headers: {authorization: localStorage.getItem('token')}
      })
      .then(response => {
        dispatch(setDeleteProduct(id))
      });
  };
};

export const setUsersCount = (count) => ({
  type: 'USERS_COUNT',
  payload: count
});

export function startSetUsersCount() {
  return dispatch => {
    axios.get(`${process.env.ROOT_URL}/api/accounts`)
      .then(response => {
        dispatch(setUsersCount(response.data.count))
      })
  };
}
