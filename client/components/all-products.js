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
      <div className="left-filter-container">
        <div className="rating-filter">
          <p className="rating-filter-text">Rating</p>
          <div>
            <input
              className="rating-checkbox genre-checkbox"
              type="checkbox"
              value="5"
            />
            <Rating className="hover" name="read-only" value={5} readOnly />
          </div>
          <div>
            <input
              className="rating-checkbox genre-checkbox"
              type="checkbox"
              value="4"
            />
            <Rating className="hover" name="read-only" value={4} readOnly />
          </div>
          <div>
            <input
              className="rating-checkbox genre-checkbox"
              type="checkbox"
              value="3"
            />
            <Rating className="hover" name="read-only" value={3} readOnly />
          </div>
          <div>
            <input
              className="rating-checkbox genre-checkbox"
              type="checkbox"
              value="2"
            />
            <Rating className="hover" name="read-only" value={2} readOnly />
          </div>
          <div>
            <input
              className="rating-checkbox genre-checkbox"
              type="checkbox"
              value="1"
            />
            <Rating className="hover" name="read-only" value={1} readOnly />
          </div>
        </div>
        <hr className="divider" />
        <div className="genre-filter">
          <p className="genre-text">Genre</p>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="comedy" />
            <label className="label-text" htmlFor="comedy">
              Comedy
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="fantasy" />
            <label className="label-text" htmlFor="fantasy">
              Fantasy
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="horror" />
            <label className="label-text" htmlFor="horror">
              Horror
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="mystery" />
            <label className="label-text" htmlFor="mystery">
              Mystery
            </label>
          </div>
          <div className="single-genre">
            <input
              className="genre-checkbox"
              type="checkbox"
              value="young-adult"
            />
            <label className="label-text" htmlFor="young-adult">
              Young Adult
            </label>
          </div>
          <div className="single-genre">
            <input
              className="genre-checkbox"
              type="checkbox"
              value="children"
            />
            <label className="label-text" htmlFor="children">
              Children's
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="sci-fi" />
            <label className="label-text" htmlFor="sci-fi">
              Sci-Fi
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="music" />
            <label className="label-text" htmlFor="music">
              Music
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="finance" />
            <label className="label-text" htmlFor="finance">
              Finance
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="comic" />
            <label className="label-text" htmlFor="comic">
              Comic
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="romance" />
            <label className="label-text" htmlFor="romance">
              Romance
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="drama" />
            <label className="label-text" htmlFor="drama">
              Drama
            </label>
          </div>
          <div className="single-genre">
            <input className="genre-checkbox" type="checkbox" value="health" />
            <label className="label-text" htmlFor="health">
              Health
            </label>
          </div>
        </div>
      </div>
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
