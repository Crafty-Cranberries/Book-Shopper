import axios from 'axios'

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const ADD_PRODUCT = 'ADD_PRODUCT'

const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const newProduct = () => async dispatch => {
  try {
    const {data} = await axios.post('/api/products/add')
    dispatch(addProduct(data))
  } catch (error) {
    console.error(error)
  }
}
const defaultProducts = []

export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log('THIS IS STATE', action.products)
      return [...action.products]
    case ADD_PRODUCT:
      return [...state, ...action.product]
    default:
      return state
  }
}
