import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {me} from '../store/user'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getUser()
    this.props.getCart(this.props.match.params.userId)
  }

  render() {
    let bookOrders = this.props.cart.BookOrders
    return (
      <div>
        {this.props.user.id ? <h1>Cart</h1> : 'no cart'}
        <div>
          {bookOrders
            ? bookOrders.map(book => {
                return (
                  <div key={book.bookId}>
                    <p>Book ID: {book.bookId}</p>
                    <p>Quantity {book.quantity}</p>
                  </div>
                )
              })
            : 'empty Cart'}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getCart: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
