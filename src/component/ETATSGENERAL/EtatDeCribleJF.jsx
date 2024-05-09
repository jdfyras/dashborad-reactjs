import PropTypes from 'prop-types'
import './EtatDeCribleJF.scss'

const EtatDeCribleJF = ({ title }) => {
  return (
    <div className='EtatDeCrible'>
      <h1 className='titleEtat'>{title}</h1>
      <div className='etatP'>
        <p>Etat Normal</p>
        <p>Etat anormal</p>
        <p>Etat urgent</p>
      </div>
      <span className='spanEtat'></span>
    </div>
  )
}

// Adding PropTypes for props validation
EtatDeCribleJF.propTypes = {
  title: PropTypes.string
}

export default EtatDeCribleJF
