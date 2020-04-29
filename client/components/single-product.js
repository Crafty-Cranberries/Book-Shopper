import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct, addToCartThunk} from '../store'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchBook(this.props.match.params.id)
  }

  render() {
    const book = this.props.book
    return (
      <div>
        <main>
          <img className="single-product-img" src={book.coverImg} />
          <h2>Title: {book.title}</h2>
          <h4>Author: {book.author}</h4>
          <h4>Genre: {book.genre}</h4>
          <h4>Rating: {book.rating}</h4>
          <p>Synopsis: {book.synopsis}</p>
          <div>
            <button
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
            </button>
          </div>
        </main>
        <div>
          <br />
          <Link to="/books">
            <h3>View All Books</h3>
          </Link>
        </div>
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
