import React from 'react'

import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
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
            <Link to="/allBooks">
              <Button variant="outline-light button-margin">All Books</Button>
            </Link>
            <Button variant="outline-light">All Authors</Button>
          </div>
        </div>
        <div className="placeholder" />
      </div>
    </div>
  )
}

export default LandingPage
