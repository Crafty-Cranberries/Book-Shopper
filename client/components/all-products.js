import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  render() {
    return (
      <div>
        <h1>Books:</h1>
        {this.props.products.map(book => {
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
              </Card.Body>
            </Card>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(AllProducts)
