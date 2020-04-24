import Axios from 'axios'

//Action Type
const GET_BOOK_ORDERS = 'GET_CART'

//Action Creator
const getBookOrders = books => ({
  type: GET_BOOK_ORDERS,
  books
})

//Thunk Creator
export const fetchBookOrders = orderId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/bookOrder/${orderId}/all`)
      dispatch(getBookOrders(data))
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
    default:
      return state
  }
}
