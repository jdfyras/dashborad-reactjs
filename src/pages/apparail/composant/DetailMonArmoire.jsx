// Removed React import if JSX Transform is enabled
import PropTypes from 'prop-types' // Import PropTypes for props validation
import CribleJF100 from '../../../component/CribleJF100/CribleJF100'
import ETATSGENERAL from '../../../component/ETATSGENERAL/ETATSGENERAL'
import NavbarUser from '../../../component/NavbarUser/NavbarUser'

function DetailArmoire({ data }) {
  return (
    <>
      <NavbarUser />

      <div className='AllMyApp'>
        <CribleJF100 title='CRIBLE JF 100' data={data} />
        <ETATSGENERAL title='ETATS GENERAL' data={data} />
        {/*<CribleJF100 title="BROYEUR WB 100" data={data} />*/}
      </div>
    </>
  )
}

DetailArmoire.propTypes = {
  data: PropTypes.object.isRequired // Validate that data is an object and is required
}

export default DetailArmoire
