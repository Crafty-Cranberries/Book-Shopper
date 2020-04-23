import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    return (
      <div>
        <h1>Cart</h1>
        {!this.props.cart.length ? (
          <div>Cart Is Empty</div>
        ) : (
          <div>
            {this.props.cart.map(book => {
              return (
                <ul key={book.id}>
                  <img src={book.imageURL} />
                  <div>Title: {book.title}</div>
                  <div>Author: {book.author}</div>
                  <div>Price: {book.price}</div>
                </ul>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Cart)
