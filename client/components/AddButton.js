import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAddBook} from '../store/cart'

class AddButton extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.props.addToCart(this.props.bookId)
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleOnClick}>
          ADD TO CART
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: bookId => dispatch(fetchAddBook(bookId))
  }
}

export default connect(null, mapDispatch)(AddButton)
