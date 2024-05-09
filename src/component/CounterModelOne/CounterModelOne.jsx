import PropTypes from 'prop-types' // Import PropTypes for props validation.
import './CounterModelOne.scss'

const CounterModelOne = ({ data }) => {
  return (
    <div className='CounterModelOne'>
      <img src='/images/compteur1.png' alt='Compteur Phase 1' />
      <span>{data?.TENSION_PHASE_1 ?? ''}</span>
      <img src='/images/compteur1.png' alt='Compteur Phase 2' />
      <span>{data?.TENSION_PHASE_2 ?? ''}</span>
      <img src='/images/compteur1.png' alt='Compteur Phase 3' />
      <span>{data?.TENSION_PHASE_3 ?? ''}</span>
    </div>
  )
}

CounterModelOne.propTypes = {
  data: PropTypes.shape({
    TENSION_PHASE_1: PropTypes.number,
    TENSION_PHASE_2: PropTypes.number,
    TENSION_PHASE_3: PropTypes.number
  })
}

export default CounterModelOne
