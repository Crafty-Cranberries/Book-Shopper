import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {removedProduct, fetchProducts} from '../store'
import history from '../history'
import {MdAddShoppingCart} from 'react-icons/md'
import {AiFillDelete} from 'react-icons/ai'
import {Rating} from '@material-ui/lab'

const AllProducts = ({products, deleteProduct, isAdmin, getProducts}) => {
  const [selections, setSelections] = useState([])
  const [ratings, setRatings] = useState([])
  const [sort, setSort] = useState('rating DESC')

  const handleOnClick = (id) => {
    deleteProduct(id)
  }

  useEffect(() => {
    getProducts(selections, ratings, sort)
  }, [selections, ratings, sort])

  const handleChange = (item) => {
    let val = item.target.value
    if (selections.indexOf(val) >= 0) {
      setSelections((state) => state.filter((i) => i !== val))
    } else {
      setSelections((state) => [...state, val])
    }
  }

  const handleRating = (e) => {
    let val = Number(e.target.value)
    if (ratings.indexOf(val) >= 0) {
      setRatings((state) => state.filter((i) => i !== val))
    } else {
      setRatings((state) => [...state, val])
    }
  }

  const handleSorting = (e) => {
    const val = e.target.value
    setSort(val)
  }

  return (
    <div className="all-products-start">
      <div className="top-container">
        <p className="results-text">{products.length} results</p>
        <div className="sort-container-main">
          <p className="sort-text">Sort by</p>
          <select className="sorting-container" onChange={handleSorting}>
            <option value="rating DESC">High Rating</option>
            <option value="rating ASC">Low Rating</option>
          </select>
        </div>
      </div>
      <div className="left-right-container">
        <div className="left-filter-container">
          <div className="rating-filter">
            <form>
              <p className="rating-filter-text">Rating</p>
              <div>
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={5}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={5} readOnly />
              </div>
              <div>
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={4}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={4} readOnly />
              </div>
              <div>
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={3}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={3} readOnly />
              </div>
              <div>
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={2}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={2} readOnly />
              </div>
              <div>
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={1}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={1} readOnly />
              </div>
            </form>
          </div>
          <hr className="divider" />
          <div className="genre-filter">
            <p className="genre-text">Genre</p>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Comedy"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="comedy">
                Comedy
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Fantasy"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="fantasy">
                Fantasy
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Horror"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="horror">
                Horror
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Mystery"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="mystery">
                Mystery
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Young Adult"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="young-adult">
                Young Adult
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Children"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="children">
                Children's
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Sci-Fi"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="sci-fi">
                Sci-Fi
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Music"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="music">
                Music
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Finance"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="finance">
                Finance
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Comic"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="comic">
                Comic
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Romance"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="romance">
                Romance
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Drama"
                onChange={handleChange}
              />
              <label className="label-text" htmlFor="drama">
                Drama
              </label>
            </div>
            <div className="single-genre">
              <input
                className="genre-checkbox"
                type="checkbox"
                value="Health"
                onChange={handleChange}
              />
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
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
  isAdmin: state.user.isAdmin,
})

const mapDispatch = (dispatch) => ({
  getProducts: (data, stars, order) =>
    dispatch(fetchProducts(data, stars, order)),
  deleteProduct: (bookId) => dispatch(removedProduct(bookId)),
})

export default connect(mapStateToProps, mapDispatch)(AllProducts)
