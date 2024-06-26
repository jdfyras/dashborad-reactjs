import { useState } from 'react'
import PropTypes from 'prop-types' // Import PropTypes for props validation
import './new.scss'
import Sidebar from '../../component/sidebar/Sidebar'
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material'
import newRequest from '../../utils/newRequest'
import { Navigate } from 'react-router-dom'

const New = ({ role }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    email: '',
    etat: ''
  })
  const [error, setError] = useState(null) // Renamed to 'error' for consistency
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await newRequest.post('/user/add', formData)
      if (res.data && res.data.msg) {
        alert(res.data.msg)
      }
    } catch (err) {
      console.error(err)
      setError(err.message)
    }
  }

  return (
    <>
      {role === 'admin' ? (
        <div className='addUser'>
          <Sidebar />
          <div className='userContainer ml-2 pt-2 mt-4'>
            <Box sx={{ maxWidth: 800, p: 2, m: 2 }}>
              <h2>Add User</h2>
              <form className='inputAddUser' onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label='Username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  type='password'
                  label='Password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    onChange={handleChange}
                    name='role'
                  >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='supervisor'>Supervisor</MenuItem>
                    <MenuItem value='engineer'>Engineer</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  type='number'
                  label='Etat'
                  name='etat'
                  value={formData.etat}
                  onChange={handleChange}
                  required
                />
                <Button type='submit' variant='contained' sx={{ mt: 2 }}>
                  Add User
                </Button>
              </form>
              {error && <p className='error'>{error}</p>}{' '}
              {/* Optionally display the error */}
            </Box>
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

New.propTypes = {
  role: PropTypes.string
}
New.defaultProps = {
  role: 'normal' // Sensible default that suits your application logic
}

export default New
