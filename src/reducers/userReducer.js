const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_IS_LOADING':
      return { ...state, userIsLoading: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload, userIsLoading: false }
    case 'SET_USERS':
      return { ...state, users: action.payload }
    case 'SET_USER_UPDATE':
      return { ...state, user: action.payload }
    case 'SET_USER_PROFILE':
      return { ...state, user: action.payload, userIsLoading: false }
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
    case 'DELETE_PRODUCT':
      const res = state.products.filter(product => product._id !== action.payload)
      return {...state, products: res}
    case 'USERS_COUNT':
      return { ...state, count: action.payload }

    default:
      return state;
  }
};

export default userReducer;
