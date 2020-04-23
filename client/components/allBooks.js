import React from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../store'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

class AllBooks extends React.Component {
  componentDidMount() {
    this.props.fetchBooks()
  }

  render() {
    return (
      <div>
        <h1>Books:</h1>
        {this.props.books.map(book => {
          return (
            <Card key={book.id} style={{width: '18rem'}}>
              <Card.Img variant="top" src={book.imageUrl} />
              <Card.Body>
                <Link to={`/allBooks/${book.id}`}>
                  <Card.Title> {book.title}</Card.Title>
                </Link>
                <Card.Subtitle>
                  {book.author.firstName} {book.author.lastName}
                </Card.Subtitle>
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
  books: state.books
})

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(fetchBooks())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
