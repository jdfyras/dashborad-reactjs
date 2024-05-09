// Removed unused import if React 17+ and new JSX Transform is being used.
import { useState } from 'react'
import PropTypes from 'prop-types' // Import PropTypes

function FormArmoir({ updateArmoir }) {
  // Assuming the prop should be `updateArmoir` for clarity
  const [formData, setFormData] = useState({
    NOM_ARMR: '',
    ETAT_BP_AU: '',
    ETAT_SECTIONNEUR: '',
    ETAT_FUSIBLE: '',
    ETAT_DISJONCTEUR: '',
    ETAT_RELAIS: '',
    ETAT_KM1: '',
    ETAT_KM2: '',
    ETAT_CONTACT_AUXILIARE: '',
    TENSION_PHASE_1: '',
    TENSION_PHASE_2: '',
    TENSION_PHASE_3: '',
    COURANT_PHASE_1: '',
    COURANT_PHASE_2: '',
    COURANT_PHASE_3: '',
    FREQUENCE: '',
    HUMIDITE: '',
    TEMPERATURE: ''
  })

  const handleChange = e => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
    updateArmoir(newFormData) // Assuming `updateArmoir` is meant to be called here
  }

  return (
    <div>
      {/* Various input fields */}
      <div className='form-group'>
        <label>NOM_ARMR:</label>
        <input
          type='text'
          className='form-control'
          name='NOM_ARMR'
          value={formData.NOM_ARMR}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add other form fields similarly */}
    </div>
  )
}

FormArmoir.propTypes = {
  updateArmoir: PropTypes.func.isRequired // Ensure that updateArmoir prop type is correctly validated
}

export default FormArmoir
