import PropTypes from 'prop-types' // Import PropTypes for props validation
import { connect } from 'react-redux'
import { updateFormData } from '../../redux/actions' // Assuming this is used somewhere else in your project
import './featuredchart.scss'
import React from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts'
import Typography from '@mui/material/Typography'

// Define the component as a named function to address Fast Refresh warning about anonymous components
function FeaturedChart({ updateFormData }) {
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 }
  ]

  return (
    <React.Fragment>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        FeaturedChart
      </Typography>

      <div style={{ width: '600px', height: 400 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              dataKey='value'
              isAnimationActive={false}
              data={data01}
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill='#8884d8'
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  )
}

FeaturedChart.propTypes = {
  updateFormData: PropTypes.func // Props validation for updateFormData
}

export default connect(null, { updateFormData })(FeaturedChart)
