/* eslint-disable no-case-declarations */
import axios from 'axios'

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const getProducts = (products) => ({type: GET_PRODUCTS, products})
const addProduct = (product) => ({type: ADD_PRODUCT, product})
const removeProduct = (productId) => ({type: REMOVE_PRODUCT, productId})

export const fetchProducts = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const newProduct = (info) => async (dispatch) => {
  try {
    if (info.coverImg.length > 0) {
      info = {
        ...info.productInfo,
        coverImg: info.coverImg,
      }
    } else {
      info = info.productInfo
    }
    const {data} = await axios.post('/api/products/add', info)
    dispatch(addProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const removedProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(removeProduct(productId))
  } catch (error) {
    console.error(error)
  }
}

const defaultProducts = []

export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.products]
    case ADD_PRODUCT:
      return [...state, action.product]
    case REMOVE_PRODUCT:
      const filteredProduct = state.filter(
        (product) => product.id !== action.productId
      )
      return [...filteredProduct]
    default:
      return state
  }
}
