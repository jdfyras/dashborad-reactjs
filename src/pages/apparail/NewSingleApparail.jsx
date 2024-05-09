import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Armoir from './composant/armoir'
import CompteurIoT from './composant/CompteurIoT'
import Transformteur from './composant/Transformteur'
import newRequest from '../../utils/newRequest'
import Sidebar from '../../component/sidebar/Sidebar'

export default function NewSingleApparail({ role }) {
  const { appId } = useParams()
  const accessToken = localStorage.getItem('accessToken')
  const [typeData, setTypeData] = useState()
  const [formData, setFormData] = useState({
    idslave: '',
    device_name: '',
    manufacturer: '',
    location: '',
    description: '',
    typeDevice: '',
    selectedUser: ''
  })
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await newRequest.get('/user', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        setUsers(res.data.users)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchUsers()
  }, [accessToken]) // Include accessToken in the dependency array

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await newRequest.post('/app/add', {
        ...formData,
        device: { ...typeData }
      })
      alert('Votre appareil a été ajouté avec succès')
    } catch (err) {
      console.error('Error adding device:', err)
    }
  }

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <form onSubmit={handleSubmit} className='p-3 m-3'>
          {/* Form inputs and labels */}
          <div className='form-group'>
            <label>Utilisateur:</label>
            <select
              className='form-control'
              name='selectedUser'
              value={formData.selectedUser}
              onChange={handleChange}
            >
              <option value=''>Sélectionnez un utilisateur</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
          </div>
          {/* Other form controls... */}
          {formData.typeDevice === 'armoire' && (
            <Armoir FormArmoir={setTypeData} />
          )}
          {formData.typeDevice === 'groupe' && (
            <CompteurIoT CompteurIoT={setTypeData} />
          )}
          {formData.typeDevice === 'transformateur' && (
            <Transformteur Transformteur={setTypeData} />
          )}
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

NewSingleApparail.propTypes = {
  role: PropTypes.string // role is not marked as required since not all uses may pass it
}
