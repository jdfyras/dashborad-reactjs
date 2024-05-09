import PropTypes from 'prop-types' // Import PropTypes for props validation
import { connect } from 'react-redux'
import './map.scss'

// Define the component as a named function to comply with Fast Refresh and add props validation
function Map({ formData }) {
  const { state, city, address } = formData

  return (
    <div className='map'>
      <iframe
        title='map'
        width='100%'
        height='450'
        frameBorder='0'
        scrolling='no'
        marginHeight='0'
        marginWidth='0'
        src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
          address
        )},${encodeURIComponent(city)},${encodeURIComponent(
          state
        )}&key=YOUR_API_KEY_HERE`}
        // Replace 'YOUR_API_KEY_HERE' with your actual Google Maps API key
      ></iframe>
    </div>
  )
}

// PropTypes to validate the props structure
Map.propTypes = {
  formData: PropTypes.shape({
    state: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  formData: state.formData // Correct assumption about the structure of your Redux state
})

export default connect(mapStateToProps)(Map)
