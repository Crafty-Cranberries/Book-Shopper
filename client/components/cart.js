import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {removeFromCart} from '../store'

function Cart(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dispatch="false"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.cart.map(product => {
          return (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <h4>Quantity: {product.quantity}</h4>
              <h4>Price {product.price}</h4>
              <button
                type="button"
                onClick={() => props.removeFromCart(product)}
              >
                Remove from cart
              </button>
            </div>
          )
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    removeFromCart: product => dispatch(removeFromCart(product))
  }
}

export default connect(mapState, mapDispatch)(Cart)
