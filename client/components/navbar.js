import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getCartThunk} from '../store'
import {Button} from 'react-bootstrap'
import Cart from './cart'

const Navbar = props => {
  const {handleClick, isLoggedIn, fetchCart, user, isAdmin} = props

  const [modalShow, setModalShow] = React.useState(false)

  const isAdminFunc = admin => {
    if (admin) {
      return (
        <div>
          <Link to="/addproduct"> Add Product </Link>
          <Link to="/users"> View Users </Link>
        </div>
      )
    }
  }
  return (
    <div className="nav-bar">
      {!isLoggedIn ? (
        <Link to="/">
          <h1 className="nav-title">BookShopper</h1>
        </Link>
      ) : (
        <Link to="/home">
          <h1 className="nav-title">BookShopper</h1>
        </Link>
      )}

      <nav className="nav-links">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="/" onClick={handleClick}>
              Logout
            </a>
            {/* {isAdmin ? <Link to="/addproduct"> Add Product </Link> : ''} */}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <div>{isAdminFunc(isAdmin)}</div>
        <div className="button-container">
          <Button
            className="cart-button"
            variant="primary"
            onClick={() => {
              setModalShow(true)
              fetchCart({isLoggedIn: isLoggedIn, userId: user})
            }}
          >
            Cart
          </Button>
        </div>
      </nav>

      <Cart
        isLoggedIn={isLoggedIn}
        userId={user}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart: info => dispatch(getCartThunk(info))
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
