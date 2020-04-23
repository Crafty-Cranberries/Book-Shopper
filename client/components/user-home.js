import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      {/* <h3>Welcome, {email}</h3> */}
      <div className="home-page-container">
        <div className="front-page-welcome">
          <div>
            <h1 className="front-display-text">
              Buy the best books from all over
            </h1>
          </div>
          <div className="front-page-buttons">
            <button type="button">All Books</button>
            <button type="button">All Authors</button>
          </div>
        </div>
        <div className="placeholder" />
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
