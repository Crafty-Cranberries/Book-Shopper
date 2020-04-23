import axios from 'axios'

const GET_BOOK = 'GET_BOOK'

export const getBook = book => ({
  type: GET_BOOK,
  book: book
})

export const fetchSingleBook = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/books/${id}`)

      const book = response.data
      dispatch(getBook(book))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialBook = {}

export default function SingleBookReducer(state = initialBook, action) {
  switch (action.type) {
    case GET_BOOK:
      return action.book

    default:
      return state
  }
}
