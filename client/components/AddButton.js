import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAddBook, fetchCart} from '../store/order'
class AddButton extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      this.props.getCart(nextProps.userId)
    }
  }
  handleOnClick() {
    let info = {
      bookId: this.props.bookId,
      orderId: this.props.order.id
    }
    this.props.fetchAddBook(info)
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
const mapState = state => {
  return {
    order: state.order
  }
}
const mapDispatch = dispatch => {
  return {
    fetchAddBook: info => dispatch(fetchAddBook(info)),
    getCart: userId => dispatch(fetchCart(userId))
  }
}
export default connect(mapState, mapDispatch)(AddButton)
