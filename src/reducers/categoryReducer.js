const productReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCTS_IS_LOADING':
      return { ...state, productsIsLoading: action.payload }
    case 'PRODUCTS_BY_CATEGORY1':
      return { ...state, products1: action.payload, productsIsLoading1: false }
    case 'PRODUCTS_BY_CATEGORY2':
      return { ...state, products2: action.payload, productsIsLoading2: false }
    case 'PRODUCTS_BY_CATEGORY3':
      return { ...state, products3: action.payload, productsIsLoading3: false }


    default:
      return state;
  }
};

export default productReducer;
