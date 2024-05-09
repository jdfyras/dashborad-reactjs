import React from 'react'
import PropTypes from 'prop-types' // Import PropTypes for props validation
import GeneratorMain from './GeneratorMain'
import NavbarUser from '../NavbarUser/NavbarUser'

const Genrator = ({ data }) => {
  return (
    <div>
      <NavbarUser />
      <GeneratorMain data={data} />
    </div>
  )
}

Genrator.propTypes = {
  data: PropTypes.object // Adding props validation for 'data'
}

export default Genrator
