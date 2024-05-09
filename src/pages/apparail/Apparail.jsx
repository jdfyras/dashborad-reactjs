import PropTypes from 'prop-types'
import './apparail.scss'
import Sidebar from '../../component/sidebar/Sidebar'
import Navbar from '../../component/navbar/Navbar'
import PartieOfThouriya from '../PartieOfThouriya/PartieOfThouriya'
import { Navigate } from 'react-router-dom'

const Apparail = ({ role }) => {
  return (
    <>
      {role === 'engineer' ? (
        <div className='apparails'>
          <Sidebar />
          <div className='apparailContainer'>
            <Navbar />
            <div className='charContainer'>
              <PartieOfThouriya />
            </div>
          </div>
        </div>
      ) : role === 'admin' ? (
        <Navigate to='/stast' replace />
      ) : (
        <Navigate to='/' replace />
      )}
    </>
  )
}

Apparail.propTypes = {
  role: PropTypes.string
}
Apparail.defaultProps = {
  role: 'normal' // Sensible default that suits your application logic
}
export default Apparail
