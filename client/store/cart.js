/* eslint-disable complexity */
/* eslint-disable no-case-declarations */

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

let defaultCart
if (localStorage.getItem('cart')) {
  defaultCart = JSON.parse(localStorage.getItem('cart'))
} else {
  defaultCart = []
}

export const getCart = () => ({type: GET_CART})
export const addToCart = product => ({type: ADD_TO_CART, product})
export const removeFromCart = product => ({type: REMOVE_FROM_CART, product})

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return [...state]
    case ADD_TO_CART:
      let newCart = state
      let inCart = false
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].id === action.product.id) {
          newCart[i].quantity++
          inCart = true
          break
        }
      }
      if (!inCart) {
        action.product.quantity = 1
        newCart.push(action.product)
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      return [...newCart]
    case REMOVE_FROM_CART:
      let updatedCart = state
      let position
      for (let i = 0; i < updatedCart.length; i++) {
        if (updatedCart[i].id === action.product.id) {
          position = i
          break
        }
      }
      updatedCart.splice(position, 1)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return [...updatedCart]
    default:
      return state
  }
}
