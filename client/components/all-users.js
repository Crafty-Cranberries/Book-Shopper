import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Card} from 'react-bootstrap'
import {fetchAllUsers} from '../store'

const AllUsers = ({users, getUsers}) => {
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <h1 className="user-page-text">Users</h1>
      {/* <CardDeck> */}
      <div className="user-cards">
        {users &&
          users.map((singleUser) => {
            return (
              <Card key={singleUser.id} style={{width: '18rem'}}>
                <Card.Body>
                  <Card.Title>
                    Name: {singleUser.firstName || 'Not Filled Out'}{' '}
                    {singleUser.lastName}
                  </Card.Title>
                  <Card.Subtitle>Email: {singleUser.email}</Card.Subtitle>
                </Card.Body>
              </Card>
            )
          })}
      </div>
      {/* </CardDeck> */}
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: state.users,
})
const mapDispatch = (dispatch) => ({
  getUsers: () => dispatch(fetchAllUsers()),
})

export default connect(mapStateToProps, mapDispatch)(AllUsers)
