import React from 'react'
import {connect} from 'react-redux'
import {removedProduct} from '../store'
import history from '../history'
import {MdAddShoppingCart} from 'react-icons/md'
import {AiFillDelete} from 'react-icons/ai'
import {Rating} from '@material-ui/lab'
import {Box} from '@material-ui/core'

const AllProducts = ({products, deleteProduct, isAdmin}) => {
  const handleOnClick = (id) => {
    deleteProduct(id)
  }

  return (
    <div className="all-products-start">
      <div className="all-products-container">
        {products.map((book) => {
          return (
            <div key={book.id} className="book-card">
              <div className="img-preview-container">
                <img
                  src={book.coverImg}
                  className="product-img-preview"
                  onClick={() => history.push(`/books/${book.id}`)}
                />
                <p className="book-genre-preview">{book.genre}</p>
                <button className="quick-add" type="button">
                  <MdAddShoppingCart />
                </button>
                {isAdmin && (
                  <button
                    type="button"
                    className="quick-delete-book"
                    onClick={() => handleOnClick(book.id)}
                  >
                    <AiFillDelete />
                  </button>
                )}
              </div>

              <div className="book-card-textarea">
                <p
                  onClick={() => history.push(`/books/${book.id}`)}
                  className="book-card-title hover-links"
                >
                  {book.title}
                </p>
                <div className="author-price-container">
                  <p
                    onClick={() => history.push(`/books/${book.id}`)}
                    className="book-card-author hover-links"
                  >
                    {book.author}
                  </p>
                  <p className="price-preview">${book.price}</p>
                </div>
                <Rating name="read-only" value={book.rating} readOnly />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
  isAdmin: state.user.isAdmin,
})

const mapDispatch = (dispatch) => ({
  deleteProduct: (bookId) => dispatch(removedProduct(bookId)),
})

export default connect(mapStateToProps, mapDispatch)(AllProducts)
