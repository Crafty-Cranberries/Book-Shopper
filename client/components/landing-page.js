import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const LandingPage = () => {
  return (
    <div>
      <div>
        <div className="welcome" />
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
            </div>
          </div>
          <div className="right-container">
            <img
              className="main-page-image"
              src="https://lh3.googleusercontent.com/proxy/dVFOy4qIAUcjvcAmBkvJB1D_uNezATnkaA1M51Q8arLln7VtCfQkPDvyCCpl_vGo15Mb5G5mLMqXFeb0VmS1hffVdF5ftcY"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
