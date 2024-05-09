import PropTypes from 'prop-types' // Import PropTypes for props validation

const PartieEtat = ({ etat, dataDis }) => {
  return (
    <div>
      <div className='part'>
        <p>{etat}</p>
        <div className='divSpan'>
          <span>{dataDis}</span>
        </div>
      </div>
    </div>
  )
}

PartieEtat.propTypes = {
  etat: PropTypes.string.isRequired, // Validate 'etat' as a required string
  dataDis: PropTypes.any // Validate 'dataDis' which can be of any type
}

export default PartieEtat
