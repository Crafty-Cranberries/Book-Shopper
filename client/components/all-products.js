import React, {useState, useEffect} from 'react'
import {ProductPreview} from './index'
import {connect} from 'react-redux'
import {removedProduct, fetchProducts} from '../store'
import {Rating, Pagination} from '@material-ui/lab'
import {FaThList} from 'react-icons/fa'
import {BsFillGrid3X2GapFill} from 'react-icons/bs'

const AllProducts = ({products, deleteProduct, isAdmin, getProducts}) => {
  const [selections, setSelections] = useState([])
  const [ratings, setRatings] = useState([])
  const [sort, setSort] = useState('rating DESC')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(15)
  const [view, setView] = useState('all-products-container')
  const genres = [
    'Comedy',
    'Fantasy',
    'Horror',
    'Mystery',
    'Young adult',
    "Children's",
    'Sci-Fi',
    'Music',
    'Finance',
    'Comic',
    'Romance',
    'Drama',
    'Health',
  ]
  const bookRatings = [5, 4, 3, 2, 1]

  const handlePage = (e, val) => {
    setPage(val)
    window.scrollTo({top: 0})
  }

  const handleOnClick = (id) => {
    deleteProduct(id)
  }

  useEffect(() => {
    getProducts(selections, ratings, sort, page, perPage)
  }, [selections, ratings, sort, page, perPage])

  const handleChange = (item) => {
    let val = item.target.value
    if (selections.indexOf(val) >= 0) {
      setSelections((state) => state.filter((i) => i !== val))
      setPage(1)
    } else {
      setSelections((state) => [...state, val])
      setPage(1)
    }
  }

  const handleRating = (e) => {
    let val = Number(e.target.value)
    if (ratings.indexOf(val) >= 0) {
      setRatings((state) => state.filter((i) => i !== val))
      setPage(1)
    } else {
      setRatings((state) => [...state, val])
      setPage(1)
    }
  }

  const handleSorting = (e) => {
    const val = e.target.value
    setSort(val)
    setPage(1)
  }

  const handlePerPage = (e) => {
    const val = Number(e.target.value)
    setPerPage(val)
    setPage(1)
  }

  const handleView = () => {
    if (view === 'all-products-container') {
      setView('all-products-container-list')
    } else {
      setView('all-products-container')
    }
  }

  return (
    <div className="all-products-start">
      {/* ---------- Results/Sorting Bar ----------*/}
      <div className="top-container">
        <p className="results-text">{products.count} results</p>
        <div className="sort-container-main">
          <button
            className="column-button"
            type="button"
            onClick={() => handleView()}
          >
            {view === 'all-products-container' ? (
              <BsFillGrid3X2GapFill />
            ) : (
              <FaThList />
            )}
          </button>
          <p className="sort-text">Per Page</p>
          <select className="sorting-container" onChange={handlePerPage}>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <p className="sort-text">Sort by</p>
          <select className="sorting-container" onChange={handleSorting}>
            <option value="rating DESC">High Rating</option>
            <option value="rating ASC">Low Rating</option>
          </select>
        </div>
      </div>
      {/* ---------- Rating Sort Bar ----------*/}
      <div className="left-right-container">
        <div className="left-filter-container">
          <div className="rating-filter">
            <form>
              <p className="rating-filter-text">Rating</p>
              {bookRatings.map((rating, i) => {
                return (
                  <div className="rating-view" key={i}>
                    <input
                      className="rating-checkbox genre-checkbox"
                      type="checkbox"
                      value={`${rating}`}
                      onChange={handleRating}
                    />
                    <Rating
                      className="hover"
                      name="read-only"
                      value={`${rating}`}
                      readOnly
                    />
                  </div>
                )
              })}
            </form>
          </div>
          <hr className="divider" />
          {/* ---------- Genre Sort Bar ----------*/}
          <div className="genre-filter">
            <p className="genre-text">Genre</p>
            {genres.map((genre, i) => {
              return (
                <div className="single-genre" key={i}>
                  <input
                    className="genre-checkbox"
                    type="checkbox"
                    value={`${genre}`}
                    onChange={handleChange}
                  />
                  <label className="label-text" htmlFor={`${genre}`}>
                    {`${genre}`}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
        {/* ---------- Products ----------*/}
        <div>
          <div className={view}>
            {products.rows.map((book) => {
              return (
                <ProductPreview
                  key={book.id}
                  book={book}
                  isAdmin={isAdmin}
                  handleOnClick={handleOnClick}
                  view={view}
                />
              )
            })}
          </div>
          {/* ---------- Pagination ----------*/}
          <div className="pagination">
            <Pagination
              count={Math.floor(products.count / perPage)}
              page={page}
              onChange={handlePage}
            />
          </div>
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
  getProducts: (data, stars, order, current, perPage) =>
    dispatch(fetchProducts(data, stars, order, current, perPage)),
  deleteProduct: (bookId) => dispatch(removedProduct(bookId)),
})

export default connect(mapStateToProps, mapDispatch)(AllProducts)
