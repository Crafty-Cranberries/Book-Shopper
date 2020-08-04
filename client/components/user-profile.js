import React, {useEffect} from 'react'
import {connect} from 'react-redux'

const Profile = (props) => {
  const {
    address,
    billingAddress,
    debitCard,
    email,
    firstName,
    lastName,
    paymentInfo,
  } = props

  return (
    <div className="content">
      <h1 className="user-page-text"> {firstName} this is your profile</h1>
    </div>
  )
}

export default Profile
