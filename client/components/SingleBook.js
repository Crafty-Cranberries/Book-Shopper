import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleBook} from '../store/singleBook'
import {Link} from 'react-router-dom'

class SingleBook extends React.Component {
  componentDidMount() {
    this.props.getSingleBook()
  }

  render() {
    let book = this.props.book

    return (
      <div>
        <main>
          <h2>Title: {book.title}</h2>
          <img src={book.imageUrl} />
          <h3>Author: {book.author}</h3>
          <h4>Genre: {book.genre}</h4>
        </main>
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapping state.book >>>>', state.book)
  return {
    book: state.book
  }
}

const mapDispatch = (dispatch, ownProps) => {
  console.log('this is dispatch to props >>>>', ownProps)
  return {
    getSingleBook: () => dispatch(fetchSingleBook(ownProps.match.params.id))
  }
}

export default connect(mapState, mapDispatch)(SingleBook)
