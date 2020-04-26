import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <div>
        <h3>Welcome back, {email}</h3>
        <div className="home-page-container">
          <div className="front-page-welcome">
            <div>
              <h1 className="front-display-text">
                Buy The Best Books From <br />
                Around The World
              </h1>
              <p className="subtext">
                Browse through our vibrant collection of books. Search by Author
                or by Genre. <br />
                Check out our clearance section for plenty of discounts!
              </p>
            </div>
            <div className="front-page-buttons">
              <Link to="/books">
                <Button variant="outline-light button-margin">All Books</Button>
              </Link>
              <Button variant="outline-light">All Authors</Button>
            </div>
          </div>
          <div className="placeholder" />
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
