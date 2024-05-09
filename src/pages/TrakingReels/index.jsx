import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SideBar from '../../component/sidebar/Sidebar'
import StatusStatistics from './Component/StatusStatisticComponent'
import CallStatisticsComponent from './Component/CallStatisticsComponent'
import CallCenter from './Component/call-center'
import { io } from 'socket.io-client'

export default function Statistics({ role }) {
  const [agents, setAgents] = useState([])
  const [msg, setMsg] = useState(null)
  const [runder, setIsRender] = useState(0)
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io('ws://localhost:5000', { autoConnect: true })

    socketRef.current.on('call center status', newMsg => {
      setMsg(newMsg)
      setAgents(prevAgents => {
        return newMsg.agents.map(newAgent => {
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

    socketRef.current.on('connect', () =>
      console.log('Socket.IO connection established')
    )
    socketRef.current.on('disconnect', () =>
      console.log('Socket.IO connection disconnected')
    )
    socketRef.current.on('error', error =>
      console.error('Socket.IO error:', error)
    )

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRender(r => r + 1) // Functional update
    }, 2000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='home'>
      <SideBar />
      <div className='homeContainer'>
        <div className='container box-container mt-3'>
          <div className='row mt-3'>
            <div className='col-lg-4 col-md-4 col-sm-6 col-xs-6 mybox'>
              <div className='box-head bb-red'>
                DISTRIBUTION DES ÉLECTRICITÉ EN TEMPS RÉEL
              </div>
              <div className='box-body'>
                <StatusStatistics msg={msg} runder={runder} />
              </div>
            </div>

            <div className='col-lg-7 col-md-7 col-sm-6 col-xs-5 mybox'>
              <div className='box-head bb-orange'>Local transfo</div>
              <div className='box-body'>
                <CallStatisticsComponent socket={socketRef.current} />
              </div>
            </div>
          </div>
          <div
            className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mybox'
            id='callCenter'
          >
            <div className='box-4'>
              <div className='box-head'>Dash (Real Time Supervisor)</div>
              <div className='box-body'>
                <CallCenter socket={socketRef.current} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Statistics.propTypes = {
  role: PropTypes.string // Validate that role is a string
}
