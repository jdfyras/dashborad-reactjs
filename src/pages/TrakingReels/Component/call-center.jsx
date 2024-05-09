import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function CallCenter({ socket }) {
  const [agents, setAgents] = useState([])
  const [criteria, setCriteria] = useState('')

  useEffect(() => {
    if (socket) {
      socket.on('call center status', msg => {
        setAgents(prevAgents => {
          return msg.agents.map(newAgent => {
            const existingAgent = prevAgents.find(
              agent => agent.id === newAgent.id
            )
            if (existingAgent && existingAgent.status !== newAgent.status) {
              return { ...existingAgent, ...newAgent }
            }
            return existingAgent || newAgent
          })
        })
      })
    }

    return () => socket && socket.off('call center status')
  }, [socket]) // Only re-run the effect if `socket` changes

  function toggleView(agent) {
    const updatedAgents = agents.map(ag =>
      ag.id === agent.id ? { ...ag, viewMode: ag.viewMode === 1 ? 0 : 1 } : ag
    )
    setAgents(updatedAgents)
  }

  const filteredAgents = agents.filter(agent => {
    return (
      criteria.length < 3 ||
      agent.status.toLowerCase().includes(criteria.toLowerCase()) ||
      agent.name.toLowerCase().includes(criteria.toLowerCase())
    )
  })

  return (
    <div className='box-4'>
      <input
        type='text'
        value={criteria}
        onChange={e => setCriteria(e.target.value)}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {filteredAgents.map((agent, index) => (
            <Grid item xs={4} key={index}>
              <Card sx={{ maxWidth: 345 }} onClick={() => toggleView(agent)}>
                <CardMedia
                  component='img'
                  alt='Agent'
                  height='140'
                  image='/images/immeuble.png'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {agent.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {agent.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography>Teams: {agent.teams.join(', ')}</Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

CallCenter.propTypes = {
  socket: PropTypes.object.isRequired // Validate that socket is an object and is required
}

export default CallCenter
