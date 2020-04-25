import Axios from 'axios'

//Action Type
const GET_BOOK_ORDERS = 'GET_CART'

//Action Creator
const getBookOrders = books => ({
  type: GET_BOOK_ORDERS,
  books
})

const ADD_BOOK_ORDER = 'ADD_BOOK_ORDER'

const addBookOrder = book => ({
  type: ADD_BOOK_ORDER,
  book
})

//Thunk Creator
export const fetchBookOrders = bookId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/bookOrder/${bookId}/all`)
      dispatch(getBookOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addBookOrderThunk = orderId => {
  return async dispatch => {
    try {
      const {data} = await Axios.post(`/api/bookOrder/${orderId}/all`)
      dispatch(addBookOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Cart Reducer
export default function bookOrdersReducer(state = [], action) {
  switch (action.type) {
    case GET_BOOK_ORDERS:
      return [action.books]
    case ADD_BOOK_ORDER:
      return [...state, action.book]
    default:
      return state
  }
}
