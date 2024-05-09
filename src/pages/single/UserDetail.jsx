import axios from 'axios' // Import PropTypes for props validation
import PropTypes from 'prop-types' // Import PropTypes for props validation
import Sidebar from '../../component/sidebar/Sidebar'
import { Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const UserDetail = ({ role }) => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    newRequest
      .get(`/user/${userId}`)
      .then(response => {
        console.log('🚀 ~ useEffect ~ response.data:', response.data)
        setUser(response.data.user)
      })
      .catch(err => console.error('Failed to fetch user:', err))
  }, [userId])

  if (!user) return <div>Loading...</div>
  return (
    <>
      {role === 'admin' ? (
        <div className='home'>
          <Sidebar />
          <div className='homeContainer'>
            <div>
              {user ? (
                <div>
                  <h1>
                    {user.username} - {user.role}
                  </h1>
                  <p>Email: {user.email}</p>
                  <p>Status: {user.etat}</p>
                  <p>Created At: {user.createdAt}</p>
                  <p>Updated At: {user.updatedAt}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      ) : role === 'supervisor' ? (
        <Navigate to='/' replace />
      ) : (
        <Navigate to='/apparails' replace />
      )}
    </>
  )
}

UserDetail.propTypes = {
  role: PropTypes.string
}
UserDetail.defaultProps = {
  role: 'normal' // Sensible default that suits your application logic
}

export default UserDetail
