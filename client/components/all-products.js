import React from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {removedProduct} from '../store'
import history from '../history'
import {MdAddShoppingCart} from 'react-icons/md'
import {AiFillDelete} from 'react-icons/ai'

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
                <p
                  onClick={() => history.push(`/books/${book.id}`)}
                  className="book-card-author hover-links"
                >
                  {book.author}
                </p>
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
