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

export function startAddProduct(formData) {
  return dispatch => {
    const formedData = formatListing(formData);
    return axios.post(`${process.env.ROOT_URL}/api/products`, formedData,
        {
          headers: {authorization: localStorage.getItem('token')}
        }
      )
      .then(response => {
        history.push('/user/my-products');
      })
  };
}

export function startSetEditProduct(formData) {
  return dispatch => {
    const formedData = formatListing(formData);
    dispatch(productsIsLoading(true));
    return axios.post(`${process.env.ROOT_URL}/api/edit-product`, formedData,
        {
          headers: {authorization: localStorage.getItem('token')}
        }
      )
      .then(response => {
        history.push('/user/my-products');
        dispatch(successMessage(response.data.message))
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

export const setUserProduct = product => ({
  type: 'USER_PRODUCT',
  payload: product
});

export function startSetUserProduct(id) {
  return dispatch => {
    dispatch(productsIsLoading(true))
    axios.get(`${process.env.ROOT_URL}/api/product/${id}`)
      .then(response => {
        dispatch(setUserProduct(response.data.product))
      })
  };
}

// DELETE_PRODUCT
export const setDeleteProduct = (id) => ({
  type: 'DELETE_PRODUCT',
  payload: id
});

export const startDeleteProduct = (id) => {
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

export const setProductsCount = (count) => ({
  type: 'PRODUCTS_COUNT',
  payload: count
});

export function startSetProductsCount() {
  return dispatch => {
    axios.get(`${process.env.ROOT_URL}/api/products/count`)
      .then(response => {
        dispatch(setProductsCount(response.data.count))
      })
  };
}
