import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import user from '../store/user'

class AllUsers extends React.Component {
  render() {
    return (
      <div>
        <h1>Books:</h1>
        {this.props.users.map(singleUser => {
          return (
            <Card key={singleUser.id} style={{width: '18rem'}}>
              <Card.Body>
                <Link to="/users">
                  <Card.Title>
                    Name: {singleUser.firstName} {singleUser.lastName}{' '}
                  </Card.Title>
                </Link>
                <Card.Subtitle>Email: {singleUser.email}</Card.Subtitle>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps)(AllUsers)
