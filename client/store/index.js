import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import booksReducer from './books'
import singleBookReducer from './singleBook'
import cartReducer from './cart'
import bookOrdersReducer from './bookOrders'

const reducer = combineReducers({
  user: user,
  books: booksReducer,
  book: singleBookReducer,
  cart: cartReducer,
  bookOrders: bookOrdersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './books'
export * from './cart'
export * from './bookOrders'
