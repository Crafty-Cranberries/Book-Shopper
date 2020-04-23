import axios from 'axios'

//Action Types:
const GET_BOOKS = 'GET_BOOKS'
//Not functional yet, placeholder for future features:
const ADD_BOOK = 'ADD_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'

//Action Creators:
const getBooks = books => ({
  type: GET_BOOKS,
  books
})

//Place holder action creators for future functionality:
const addBook = book => ({
  type: ADD_BOOK,
  book
})
const removeBook = book => ({
  type: REMOVE_BOOK,
  book
})

//Thunk Creators:
export const fetchBooks = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/book')
    dispatch(getBooks(data))
  } catch (error) {
    console.error(error)
  }
}

//Reducer:
const books = []

export default function booksReducer(state = books, action) {
  switch (action.type) {
    case GET_BOOKS:
      return action.books
    default:
      return state
  }
}
