import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Button} from 'react-bootstrap'
import Cart from './cart'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => {
  const [modalShow, setModalShow] = React.useState(false)

  const isAdminFunc = admin => {
    if (admin) {
      return <Link to="/addproduct"> Add Product </Link>
    }
  }
  return (
    <div className="nav-bar">
      <h1>Book-Shopper</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
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
        {isAdminFunc(isAdmin)}
      </nav>
      <hr />
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Cart
      </Button>
      <Cart show={modalShow} onHide={() => setModalShow(false)} />
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
    }
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
