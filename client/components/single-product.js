import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct, addToCartThunk} from '../store'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Container, Col, Button, Image, Row} from 'react-bootstrap'

toast.configure()

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchBook(this.props.match.params.id)
  }

  render() {
    const book = this.props.book
    return (
      <div className="singleproduct">
        <Container bsPrefix="singleProduct">
          <Row>
            <Col>
              <Image
                className="single-product-img"
                src={book.coverImg}
                rounded
              />
              <h2>Title: {book.title}</h2>
              <h5 className="author">By: {book.author}</h5>
              <Row xs={2} md={4} lg={6}>
                {' '}
                <Col>
                  <h4>Genre: {book.genre}</h4>
                </Col>
                <Col>
                  <h4>Rating: {book.rating}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Synopsis: {book.synopsis}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row xs={2} md={4} lg={6}>
            {' '}
            <Col bsPrefix="price">
              <h3> ${book.price} </h3>
            </Col>
            <Col>
              <Button
                variant="success"
                key="singleButton"
                onClick={() => {
                  this.props.addToCart({
                    isLoggedIn: this.props.isLoggedIn,
                    userId: this.props.userId,
                    productId: book.id,
                    product: book,
                    price: book.price
                  })
                  this.props.addToCartSuccess()
                }}
                type="button"
              >
                Add To Cart
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
const mapState = state => {
  return {
    book: state.singleProduct,
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    fetchBook: bookId => dispatch(fetchSingleProduct(bookId)),
    addToCart: info => dispatch(addToCartThunk(info)),
    addToCartSuccess: () =>
      toast('Added Book To Cart!', {position: toast.POSITION.TOP_CENTER})
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
