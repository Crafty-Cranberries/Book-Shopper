import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ProductPreview} from './index'
import {connect} from 'react-redux'
import {removedProduct, fetchProducts} from '../store'
import {Rating, Pagination} from '@material-ui/lab'
import {FaThList} from 'react-icons/fa'
import {BsFillGrid3X2GapFill} from 'react-icons/bs'
import SearchBar from 'material-ui-search-bar'

const AllProducts = ({products, deleteProduct, isAdmin, getProducts}) => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(15)
  const [productList, setProductList] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [ratings, setRatings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selections, setSelections] = useState([])
  const [sort, setSort] = useState('rating DESC')
  const [view, setView] = useState('all-products-container')

  const fetchAllProducts = async () => {
    try {
      const allProducts = await axios.get('/api/products')
      setProductList(allProducts.data)
    } catch (error) {
      console.log(error)
    }
  }

  // fetches all products upon mounting
  // useEffect(() => {
  //   fetchAllProducts()
  // }, [])

  useEffect(() => {
    getProducts(selections, ratings, sort, page, perPage, searchTerm)
    setTimeout(() => {
      console.log('useEffect >>>> products = ', products)
    }, 1000)
  }, [selections, ratings, sort, page, perPage, searchTerm])

  const handleOnClick = (id) => {
    deleteProduct(id)
  }

  const handleSearch = (value) => {
    let newProducts = []
    console.log('handleSearch >>> value = ', value)
    // if (value.trim().length > 0) {
    //   console.log('s >>>> productlist = ', productList)
    //   console.log(
    //     'Before filtering!!! >>>> filteredProducts = ',
    //     filteredProducts
    //     )
    //     newProducts = productList.filter((product) => {
    //       const lCase = product.title.toLowerCase()
    //       const filter = value.toLowerCase()
    //       return lCase.includes(filter)
    //     })
    //   } else {
    //     newProducts = productList
    //   }

    setSearchTerm(value)
    setFilteredProducts(newProducts)
    // console.log('newProducts >>> ', newProducts)
    // console.log('After >>>> filteredProducts = ', filteredProducts)
  }

  // Handle the genre checkbox change
  const handleGenre = (item) => {
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

  // sort by (high rating or low rating)
  const handleSorting = (e) => {
    const val = e.target.value
    console.log('handleSorting e.target.value = ', val)
    setSort(val)
    setPage(1)
  }

  // when clicking pagination (paging) button number
  const handlePage = (e, val) => {
    console.log('handlePage >>> val ', val)
    setPage(val)
    window.scrollTo({top: 0})
  }

  // handles change to items per page
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
      <div className="top-container">
        <p className="results-text">
          {filteredProducts.length > 0
            ? filteredProducts.length
            : products.count}{' '}
          results
        </p>

        <SearchBar
          value={searchTerm}
          onChange={(newValue) => setSearchTerm(newValue)}
          onRequestSearch={() => {
            handleSearch(searchTerm)
            // handleView()
            // handlePage(null, 1)
          }}
          onCancelSearch={() => {
            setSearchTerm('')
            setFilteredProducts([])
          }}
        />

        {/* <form onSubmit={(e) => onFormSubmit(e)}>
          <input
            name="search"
            type="text"
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => handleSearchChange(e)}
            // onChange={e => setSearchTerm(e.target.value)}
          />
        </form> */}
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
      <div className="left-right-container">
        <div className="left-filter-container">
          <div className="rating-filter">
            <form>
              <p className="rating-filter-text">Rating</p>
              <div className="rating-view">
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={5}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={5} readOnly />
              </div>
              <div className="rating-view">
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={4}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={4} readOnly />
              </div>
              <div className="rating-view">
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={3}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={3} readOnly />
              </div>
              <div className="rating-view">
                <input
                  className="rating-checkbox genre-checkbox"
                  type="checkbox"
                  value={2}
                  onChange={handleRating}
                />
                <Rating className="hover" name="read-only" value={2} readOnly />
              </div>
              <div className="rating-view">
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
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
                onChange={handleGenre}
              />
              <label className="label-text" htmlFor="health">
                Health
              </label>
            </div>
          </div>
        </div>
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
          <div className="pagination">
            {/* {filteredProducts.length > 0 ? (
              <Pagination
                count={Math.floor(filteredProducts.length / perPage)}
                page={page}
                onChange={handlePage}
              />
            ) : ( */}
            <Pagination
              count={Math.floor(products.count / perPage)}
              page={page}
              onChange={handlePage}
            />
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

// filteredProducts.length > 0
//               ? filteredProducts.map((book) => {
//                   return (
//                     <ProductPreview
//                       key={book.id}
//                       book={book}
//                       isAdmin={isAdmin}
//                       handleOnClick={handleOnClick}
//                       view={view}
//                     />
//                   )
//                 })
//               :

const mapStateToProps = (state) => ({
  products: state.products,
  isAdmin: state.user.isAdmin,
})

const mapDispatch = (dispatch) => ({
  getProducts: (data, stars, order, current, perPage, searchTerm) =>
    dispatch(fetchProducts(data, stars, order, current, perPage, searchTerm)),
  deleteProduct: (bookId) => dispatch(removedProduct(bookId)),
})

export default connect(mapStateToProps, mapDispatch)(AllProducts)
