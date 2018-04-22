const productReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return { ...state, message: action.payload, savedMessage: 'Saved' }
    case 'CLEAR_MESSAGE':
      return { ...state, message: action.payload,  savedMessage: null }
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'ADD_PRODUCT':
      return { ...state, product: action.payload }
    case 'PRODUCTS_IS_LOADING':
      return { ...state, productsIsLoading: action.payload }
    case 'MY_PRODUCTS':
      return { ...state, products: action.payload, productsIsLoading: false }
    case 'USER_PRODUCTS':
      return { ...state, products: action.payload, productsIsLoading: false }
    case 'USER_PRODUCT':
      return { ...state, product: action.payload, productsIsLoading: false }
    case 'DELETE_PRODUCT':
      const res = state.products.filter(product => product._id !== action.payload)
      return {...state, products: res}
    case 'PRODUCTS_COUNT':
      return { ...state, count: action.payload }

    default:
      return state;
  }
};

export default productReducer;
