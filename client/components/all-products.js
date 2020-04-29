import React from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {removedProduct} from '../store'

// export default function AddProductForm(props) {

function AllProducts(props) {
  console.log(props)
  const {removedProductThunk} = props
  return (
    <div>
      <h1>Books:</h1>
      {props.products.map(book => {
        return (
          <Card key={book.id} style={{width: '18rem'}}>
            <Card.Img variant="top" src={book.coverImg} />
            <Card.Body>
              <Link to={`/books/${book.id}`}>
                <Card.Title> {book.title}</Card.Title>
              </Link>
              <Card.Subtitle>{book.author}</Card.Subtitle>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
              </Card.Text>
              <Button
                variant="danger"
                onClick={
                  (() => console.log(book.id), removedProductThunk(book.id))
                }
              >
                Remove Product
              </Button>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  removedProductThunk: book => dispatch(removedProduct(book))
})

export default connect(mapStateToProps, mapDispatch)(AllProducts)
