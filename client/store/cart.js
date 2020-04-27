/* eslint-disable no-case-declarations */

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
const COMPLETE_PURCHASE = 'COMPLETE_PURCHASE'

let defaultCart
if (localStorage.getItem('cart')) {
  defaultCart = JSON.parse(localStorage.getItem('cart'))
} else {
  defaultCart = []
}

export const getCart = () => ({type: GET_CART})
export const addToCart = product => ({type: ADD_TO_CART, product})
export const increaseQuantity = product => ({
  type: INCREASE_QUANTITY,
  product
})
export const decreaseQuantity = product => ({
  type: DECREASE_QUANTITY,
  product
})
export const completePurchase = () => ({
  type: COMPLETE_PURCHASE
})

// eslint-disable-next-line complexity
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return state
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

    case INCREASE_QUANTITY:
      let updatedQuantity = state
      for (let i = 0; i < updatedQuantity.length; i++) {
        if (updatedQuantity[i].id === action.product.id) {
          updatedQuantity[i].quantity++
          break
        }
      }
      localStorage.setItem('cart', JSON.stringify(updatedQuantity))
      return [...updatedQuantity]

    case DECREASE_QUANTITY:
      let decreasedQuantity = state

      for (let i = 0; i < decreasedQuantity.length; i++) {
        if (decreasedQuantity[i].id === action.product.id) {
          decreasedQuantity[i].quantity--
          break
        }
      }
      localStorage.setItem('cart', JSON.stringify(decreasedQuantity))
      return [...decreasedQuantity]
    case COMPLETE_PURCHASE:
      let newState = []
      localStorage.setItem('cart', JSON.stringify(newState))

      return newState
    default:
      return state
  }
}
