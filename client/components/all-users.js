import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
// import user from '../store/user'
import {fetchAllUsers} from '../store/usersReducer'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        <h1>List of all the users</h1>
        {Array.isArray(this.props.users) &&
          this.props.users.map(singleUser => {
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
const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapStateToProps, mapDispatch)(AllUsers)
