import axios from 'axios';
import {history} from '../routers/AppRouter';

export const productsIsLoading = (bool) => ({
  type: 'PRODUCTS_IS_LOADING',
  payload: bool
});

export const setProductsByCategory1 = products => ({
  type: 'PRODUCTS_BY_CATEGORY1',
  payload: products
});

export function startProductsByCategory1(id) {
  return dispatch => {
    dispatch(productsIsLoading(true))
    axios.get(`${process.env.ROOT_URL}/api/categories/${id}`)
      .then(response => {
        dispatch(setProductsByCategory1(response.data.products))
      })
  };
}

export const setProductsByCategory2 = products => ({
  type: 'PRODUCTS_BY_CATEGORY2',
  payload: products
});

export function startProductsByCategory2(id) {
  return dispatch => {
    dispatch(productsIsLoading(true))
    axios.get(`${process.env.ROOT_URL}/api/categories/${id}`)
      .then(response => {
        dispatch(setProductsByCategory2(response.data.products))
      })
  };
}

export const setProductsByCategory3 = products => ({
  type: 'PRODUCTS_BY_CATEGORY3',
  payload: products
});

export function startProductsByCategory3(id) {
  return dispatch => {
    dispatch(productsIsLoading(true))
    axios.get(`${process.env.ROOT_URL}/api/categories/${id}`)
      .then(response => {
        dispatch(setProductsByCategory3(response.data.products))
      })
  };
}
