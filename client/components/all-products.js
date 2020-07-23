import React from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {removedProduct} from '../store'

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
            <Card
              className="product-preview"
              key={book.id}
              style={{width: '18rem'}}
            >
              <Card.Img variant="top" src={book.coverImg} />
              <Card.Body>
                <Link to={`/books/${book.id}`}>
                  <Card.Title> {book.title}</Card.Title>
                </Link>
                <Card.Subtitle>{book.author}</Card.Subtitle>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
                </Card.Text>
                {isAdminFunc(isAdmin, book.id)}
              </Card.Body>
            </Card>
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
