import PropTypes from 'prop-types' // Import PropTypes for props validation
import CounterModelOne from '../CounterModelOne/CounterModelOne'
import CounterModelTwo from '../CounterModelTwo/CounterModelTwo'
import PartieDisjoncteur from '../PartieDisjoncteur/PartieDisjoncteur'
import './CribleJF100.scss'

const CribleJF100 = ({ title, data }) => {
  return (
    <div className='SectionOne'>
      <h1>{title}</h1>
      <div>
        <CounterModelOne data={data} />
        <CounterModelTwo data={data} />
        <PartieDisjoncteur data={data} />
      </div>
    </div>
  )
}

CribleJF100.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object
}

export default CribleJF100
