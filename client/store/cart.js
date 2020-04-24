import Axios from 'axios'

//Action Type
const GET_CART = 'GET_CART'
const ADD_BOOK = 'ADD_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'

//Action Creator
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addBook = book => ({
  type: ADD_BOOK,
  book
})

const removeBook = bookId => ({
  type: REMOVE_BOOK,
  bookId
})

//Thunk Creator
export const fetchCart = userId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/order/${userId}`)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAddBook = bookId => {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`/api/order/${bookId}`)
      dispatch(addBook(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Cart Reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      console.log('THIS IS ACTION >>>>>>>', action)
      return action.cart
    default:
      return state
  }
}
