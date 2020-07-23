import React from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {removedProduct} from '../store'
import history from '../history'

const AllProducts = ({products, deleteProduct, isAdmin}) => {
  const handleOnClick = (id) => {
    deleteProduct(id)
  }

  const isAdminFunc = (admin, bookId) => {
    if (admin) {
      return (
        <Button variant="danger" onClick={() => handleOnClick(bookId)}>
          Remove Product
        </Button>
      )
    }
  }
  return (
    <div className="all-products-start">
      <div className="all-products-container">
        {products.map((book) => {
          return (
            <div
              key={book.id}
              className="book-card"
              onClick={() => history.push(`/books/${book.id}`)}
            >
              <div className="img-preview-container">
                <img src={book.coverImg} className="product-img-preview" />
                <button className="quick-add" type="button">
                  +
                </button>
              </div>

              <div className="book-card-textarea">
                <p className="book-card-title">{book.title}</p>
                <p>{book.author}</p>
                {isAdminFunc(isAdmin, book.id)}
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
