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

export const fetchAddBook = info => {
  return async dispatch => {
    try {
      const {data} = await Axios.post(
        `/api/bookOrder/${info.orderId}/${info.bookId}`
      )
      dispatch(addBook(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Cart Reducer
export default function orderReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_BOOK:
      return [...state, action.book]
    default:
      return state
  }
}
