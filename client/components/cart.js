import React from 'react'
import {Modal, Button, ButtonGroup, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {increaseQuantity, decreaseQuantity, completePurchase} from '../store'

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
              <ButtonGroup size="sm">
                <Button
                  variant="secondary"
                  onClick={() => props.increaseQuantity(product)}
                >
                  Qty +
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => props.decreaseQuantity(product)}
                >
                  Qty -
                </Button>
              </ButtonGroup>
              <h4>Price: ${product.price}</h4>
              <h4>Subtotal: ${product.price * product.quantity}</h4>
            </div>
          )
        })}
      </Modal.Body>
      <Modal.Footer>
        <Col>
          Total: ${' '}
          {props.cart
            .reduce((total, product) => {
              console.log('PRODUCT IN CART', product.price * product.quantity)
              return total + product.price * product.quantity
            }, 0.0)
            .toFixed(2)}
        </Col>
        <Button
          variant="success"
          href="/completepurchase"
          onClick={props.completePurchase}
        >
          Complete Purchase
        </Button>
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
    increaseQuantity: product => dispatch(increaseQuantity(product)),
    decreaseQuantity: product => dispatch(decreaseQuantity(product)),
    completePurchase: () => dispatch(completePurchase())
  }
}

export default connect(mapState, mapDispatch)(Cart)
