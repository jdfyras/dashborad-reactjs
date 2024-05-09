import { useState, useEffect } from 'react'
import './home.scss'
import Sidebar from '../../component/sidebar/Sidebar'
import Navbar from '../../component/navbar/Navbar'
import Widget from '../../component/widgets/Widget'
import FeaturedChart from '../../component/featured/FeaturedChart'
import Chart from '../../component/chart/Chart'
import LineChart from '../../component/chart/LineChart'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { decodeJwt } from '../../utils/getToken'

const Home = () => {
  const [statestique] = useState(14) // Removed setStatestique if not used
  const [role, setRole] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const decodedData = decodeJwt(token)
        if (decodedData && decodedData.role) {
          console.log('Decoded token:', decodedData)
          setRole(decodedData.role)
        }
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [])

  // Render based on role state
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <Box sx={{ flexGrow: 1, p: 2, m: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={5}>
              <Widget
                title={'Users Stat'}
                type='Users'
                sx={{ flexGrow: 1 }} // This comment is not needed as the corrected code is now in use
                statestique={statestique}
              />
            </Grid>
            <Grid item xs={6} md={5}>
              <Widget
                title={'Ingenieurs'}
                type='Ingenieurs'
                sx={{ flexGrow: 1 }}
                statestique={statestique}
              />
            </Grid>
          </Grid>
        </Box>
        <div className='charts'>
          <FeaturedChart />
          <Chart />
        </div>
        <div>
          <LineChart />
        </div>
      </div>
    </div>
  )
}

export default Home
