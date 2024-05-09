import PropTypes from 'prop-types' // Import PropTypes for props validation
import './PartieDisjoncteur.scss'
import PartieEtat from './PartieEtat'

const PartieDisjoncteur = ({ data }) => {
  const etatsOne = [
    'ETAT_DISJONCTEUR',
    'ETAT_SECTIONNEUR',
    'ETAT_FUSIBLE',
    'ETAT_BP_AU'
  ]
  const etatsTwo = ['ETAT_RELAIS', 'ETAT_KM1', 'ETAT_KM2', 'ETAT_RELAIS']

  return (
    <div className='PartieDisjoncteur'>
      <div className='allPartie'>
        <div>
          {etatsOne.map((etat, index) => (
            <PartieEtat
              key={index}
              etat={etat}
              dataDis={
                data &&
                Object.keys(data)
                  .filter(item => item.includes(etat))
                  .map(item => data[item])
              }
            />
          ))}
        </div>

        <div>
          {etatsTwo.map((etat, index) => (
            <PartieEtat
              key={index}
              etat={etat}
              dataDis={
                data &&
                Object.keys(data)
                  .filter(item => item.includes(etat))
                  .map(item => data[item])
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

PartieDisjoncteur.propTypes = {
  data: PropTypes.object // Prop validation for 'data' as an object
}

export default PartieDisjoncteur
