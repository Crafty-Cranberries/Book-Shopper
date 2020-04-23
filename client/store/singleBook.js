import axios from 'axios'

const GET_BOOK = 'GET_BOOK'

export const getBook = book => ({
  type: GET_BOOK,
  book
})

export const fetchSingleBook = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/books/${id}`)
      dispatch(getBook(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function SingleBookReducer(state = {}, action) {
  switch (action.type) {
    case GET_BOOK:
      return action.book
    default:
      return state
  }
}
