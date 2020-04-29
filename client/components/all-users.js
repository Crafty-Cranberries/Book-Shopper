import React from 'react'
import {connect} from 'react-redux'
import {Card, CardDeck} from 'react-bootstrap'
import {fetchAllUsers} from '../store/usersReducer'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        <h1>Users:</h1>
        <CardDeck>
          {this.props.users &&
            this.props.users.map(singleUser => {
              return (
                <Card key={singleUser.id} style={{width: '18rem'}}>
                  <Card.Body>
                    <Card.Title>
                      Name:
                      {singleUser.firstName || 'Not Filled Out'}
                      {singleUser.lastName}
                    </Card.Title>
                    <Card.Subtitle>Email: {singleUser.email}</Card.Subtitle>
                  </Card.Body>
                </Card>
              )
            })}
        </CardDeck>
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
