import React from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../store'

class AllBooks extends React.Component {
  componentDidMount() {
    this.props.fetchBooks()
    console.log('This ish is mounted')
  }

  render() {
    console.log('props ---->', this.props)
    return (
      <div>
        <h1>Books:</h1>
        <ul>
          {this.props.books.map(book => {
            return <li key={book.id}>{book.title}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  books: state.booksReducer
})

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(fetchBooks())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
