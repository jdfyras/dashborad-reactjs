import PropTypes from 'prop-types' // Import PropTypes for props validation
import './MainGenerator.scss'

const GeneratorMain = ({ data }) => {
  return (
    <div className='MainCompTransfor'>
      <div className='row'>
        <div className='col-md-9'>
          <div className='d-flex justify-content-between'>
            <div className='col-md-6 d-flex justify-content-between blockboredmaingenerator'>
              <h3>Local Groupes</h3>
              <img src='/images/immeuble.png' alt='' />
              <div>
                <img src='/images/oil.png' alt='' />
                <p>{data?.voltage1} °C</p>
                <img src='/images/temp.png' alt='' />
                <p>{data?.current1} °C</p>
                <img src='/images/wireless.png' alt='' />
                <p>{data?.power1} °C</p>
              </div>
            </div>
            <div className='blockTwo col-md-6 blockboredmaingenerator d-flex justify-content-between'>
              <div>
                <h3>Eau De Ref</h3>
                <img src='/images/compteurGris.png' alt='' />
                <p>{data?.pf1}</p>
              </div>
              <div>
                <h3>Huile</h3>
                <img src='/images/compteurGris.png' alt='' />
                <p>{data?.pf2}</p>
              </div>
            </div>
          </div>
          <div className='pl-1 pr-1 ml-1 mr-1 blockboredmaingenerator'>
            <div className='text-center'>
              <div className='blockOnegenerator'>
                <img src='/images/oil.png' alt='' />
                <p>{data?.frequency3} °C</p>
                <img src='/images/temp.png' alt='' />
                <p>{data?.temperature}</p>
                <img src='/images/wireless.png' alt='' />
                <p>{data?.humidity}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-3 blockboredmaingenerator'>
          <img src='/images/wireless.png' alt='' />
          <p>{data?.humidity}</p>
        </div>
      </div>
    </div>
  )
}

GeneratorMain.propTypes = {
  data: PropTypes.shape({
    voltage1: PropTypes.number,
    current1: PropTypes.number,
    power1: PropTypes.number,
    pf1: PropTypes.number,
    pf2: PropTypes.number,
    frequency3: PropTypes.number,
    temperature: PropTypes.number,
    humidity: PropTypes.number
  })
}

export default GeneratorMain
