import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../component/sidebar/Sidebar'
import newRequest from '../../utils/newRequest'
import Detailstranform from './composant/Detailstranform'
import DetailMonArmoire from './composant/DetailMonArmoire'
import GeneratorAppareil from '../../component/generatorAppareil/Genrator'

export default function SingleApparail() {
  const [devices, setDevices] = useState(null)
  const [relationDevice, setRelationDevice] = useState(null)

  const { appId } = useParams() // Use destructuring directly

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await newRequest.get(`/app/${appId}`)
        setDevices(res.data.devices)
        setRelationDevice(res.data.relationDevice)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()

    // The cleanup function here might not be necessary unless you're setting up a subscription or event listeners
  }, [appId]) // Include appId in the dependency array

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        {devices && (
          <>
            <p>
              <span className='text-danger'>Type device: </span>
              {devices.typeDevice}
            </p>
            <p>
              <span className='text-danger'>Location: </span>
              {devices.location}
            </p>
            <div>
              {devices.typeDevice === 'armoire' && (
                <DetailMonArmoire data={relationDevice} />
              )}
              {devices.typeDevice === 'groupe' && (
                <GeneratorAppareil data={relationDevice} />
              )}
              {devices.typeDevice === 'transformateur' && (
                <Detailstranform data={relationDevice} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
