/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
const COMPLETE_PURCHASE = 'COMPLETE_PURCHASE'

let defaultCart = []
// if (localStorage.getItem('cart')) {
// if (req.user) {

//   // }
//   defaultCart = JSON.parse(localStorage.getItem('cart'))
// } else {
//   defaultCart = []
// }

//////////////////////////////////
// ***** ACTION CREATORS ***** //
////////////////////////////////

export const getCart = cart => ({type: GET_CART, cart})
export const addToCart = product => ({type: ADD_TO_CART, product})
export const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
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

////////////////////////////////////
// ***** UTILITY FUNCTIONS ***** //
//////////////////////////////////

//This formats the api data response so we can access the information easier
function returnFormatedProducts(obj) {
  const reformatted = obj.products.map(product => {
    return {
      ...product,
      quantity: product.ProductOrder.quantity,
      price: product.ProductOrder.price
    }
  })
  return reformatted
}

//loops through the local storage cart and makes a post request for each product
async function asyncForEachPost(books, userId) {
  for (let i = 0; i < books.length; i++) {
    let product = books[i]
    await axios.post(`/api/users/${userId}/orders/active`, {
      price: product.price,
      quantity: product.quantity,
      productId: product.id
    })
  }
}

/////////////////////////
// ***** THUNKS ***** //
///////////////////////

export const getCartThunk = info => async dispatch => {
  try {
    if (!info.isLoggedIn) {
      const cart = JSON.parse(localStorage.getItem('cart'))
      dispatch(getCart(cart))
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart'))
      if (localCart) {
        await asyncForEachPost(localCart, info.userId)
      }
      const {data} = await axios.get(`/api/users/${info.userId}/orders/active`)
      let cart = returnFormatedProducts(data)
      localStorage.removeItem('cart')
      dispatch(getCart(cart))
    }
  } catch (err) {
    console.error(err)
  }
}

/////////////////////////
// ***** REDUCER ***** //
///////////////////////

// eslint-disable-next-line complexity
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      if (action.cart === null) action.cart = []
      return [...action.cart]
    case ADD_TO_CART:
      let newCart = [...state]
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
    // case REMOVE_FROM_CART:
    //   let updatedCart = state
    //   let position
    //   for (let i = 0; i < updatedCart.length; i++) {
    //     if (updatedCart[i].id === action.product.id) {
    //       position = i
    //       break
    //     }
    //   }
    //   updatedCart.splice(position, 1)
    //   localStorage.setItem('cart', JSON.stringify(updatedCart))
    //   return [...updatedCart]

    // case INCREASE_QUANTITY:
    //   let updatedQuantity = state
    //   for (let i = 0; i < updatedQuantity.length; i++) {
    //     if (updatedQuantity[i].id === action.product.id) {
    //       updatedQuantity[i].quantity++
    //       break
    //     }
    //   }
    //   localStorage.setItem('cart', JSON.stringify(updatedQuantity))
    //   return [...updatedQuantity]

    // case DECREASE_QUANTITY:
    //   let decreasedQuantity = state

    //   for (let i = 0; i < decreasedQuantity.length; i++) {
    //     if (decreasedQuantity[i].id === action.product.id) {
    //       decreasedQuantity[i].quantity--
    //       break
    //     }
    //   }
    //   localStorage.setItem('cart', JSON.stringify(decreasedQuantity))
    //   return [...decreasedQuantity]
    // case COMPLETE_PURCHASE:
    //   let newState = []
    //   localStorage.setItem('cart', JSON.stringify(newState))

    //   return newState
    default:
      return state
  }
}
