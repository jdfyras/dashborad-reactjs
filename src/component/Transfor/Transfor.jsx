import PropTypes from 'prop-types' // Import PropTypes for props validation
import NavBarTransfor from '../NavBarTransfor/NavBarTransfor'
import NavbarUser from '../NavbarUser/NavbarUser'
import MainCompTransfor from '../MainCompTransfor/MainCompTransfor'

const Transfor = ({ data }) => {
  return (
    <div>
      <NavBarTransfor />
      <NavbarUser />
      <MainCompTransfor data={data} />
    </div>
  )
}

Transfor.propTypes = {
  data: PropTypes.object // Add props validation for 'data'
}

export default Transfor
