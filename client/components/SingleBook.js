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
    let author = this.props.book.author
    return (
      <div>
        <main>
          <h2>Title: {book.title}</h2>
          <img src={book.imageUrl} />
          {author ? (
            <h3>
              Author: {author.firstName} {author.lastName}{' '}
            </h3>
          ) : (
            'loading'
          )}
          <h4>Genre: {book.genre}</h4>
        </main>
        <div>
          <br />
          <Link to="/allBooks">
            <h3>View all all books</h3>
          </Link>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  // console.log('mapping state.book >>>>', state.book)
  return {
    book: state.book
  }
}

const mapDispatch = (dispatch, ownProps) => {
  // console.log('this is dispatch to props >>>>', ownProps)
  const id = ownProps.match.params.id
  return {
    getSingleBook: () => dispatch(fetchSingleBook(id))
  }
}

export default connect(mapState, mapDispatch)(SingleBook)
