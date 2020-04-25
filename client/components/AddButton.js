import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAddBook} from '../store/order'

class AddButton extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    // let data = {
    //   orderId: 2,
    //   bookId: 3,
    // }
    // this.props.fetchAddBook(data)
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
    fetchAddBook: info => dispatch(fetchAddBook(info))
  }
}

export default connect(null, mapDispatch)(AddButton)
