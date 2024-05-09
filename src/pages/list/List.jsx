import PropTypes from 'prop-types'
import './list.scss'
import Sidebar from '../../component/sidebar/Sidebar'
import Navbar from '../../component/navbar/Navbar'
import Datatable from '../../component/dataTable/DataTable'
import { Navigate } from 'react-router-dom'

const List = ({ role }) => {
  return (
    <>
      {role === 'admin' ? (
        <div className='home'>
          <Sidebar />
          <div className='homeContainer'>
            <Navbar />
            <Datatable />
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

List.propTypes = {
  role: PropTypes.string
}

List.defaultProps = {
  role: 'normal' // Sensible default that suits your application logic
}

export default List
