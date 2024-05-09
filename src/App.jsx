import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import './App.css'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Login from './pages/login/Login'
import New from './pages/new/New'
import UserDetail from './pages/single/UserDetail'
import Zone from './pages/zone/Zone'
import Apparail from './pages/apparail/Apparail'
import Reglage from './component/reglage/Reglage'
import Profile from './pages/profile/Profile'
import HistoriqueDonne from './pages/HistoriqueDonne/HistoriqueDonne'
import ForgetPassword from './pages/login/ForgetPassword'
import TrakingReels from './pages/TrakingReels'
import SingleApparail from './pages/apparail/SingleApparail'
import NewSingleApparail from './pages/apparail/NewSingleApparail'
import NotFound from './component/notFound/NotFound'
import { decodeJwt } from './utils/getToken'
import ListeApparail from './pages/apparail/ListeApparail'

function App() {
  const [role, setRole] = useState(null)
  const [user, setUser] = useState(null)
  const [currentUser, setcurrentUser] = useState({})
  const [token, setToken] = useState(localStorage.getItem('accessToken')) // Manage token as a state

  useEffect(() => {
    const updateAuthData = () => {
      if (token) {
        let data = decodeJwt(token)
        if (data) {
          console.log('User=>', data)
          setRole(data.role)
          setUser(data)
          setcurrentUser(data)
        }
      }
    }

    updateAuthData()
  }, [token]) // Depend only on `token`, which changes less frequently and is a simple state

  return (
    <Provider store={store}>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={<Home role={role} />} />
              <Route path='login' element={<Login />} />
              <Route path='ForgetPassword' element={<ForgetPassword />} />
              <Route path='zones' element={<Zone role={role} />} />
              <Route path='reglage' element={<Reglage role={role} />} />
              <Route
                path='profile'
                element={<Profile currentUser={currentUser} />}
              />
              <Route
                path='historiquedonnees'
                element={<HistoriqueDonne role={role} />}
              />
              <Route path='stast' element={<TrakingReels role={role} />} />
              <Route path='users'>
                <Route index element={<List role={role} />} />
                <Route path=':userId' element={<UserDetail role={role} />} />
                <Route path='new' element={<New role={role} />} />
              </Route>
              <Route path='apparails'>
                <Route index element={<Apparail role={role} />} />
                <Route path=':appId' element={<SingleApparail role={role} />} />
                <Route path='new' element={<NewSingleApparail role={role} />} />
                <Route
                  path='listeApparail'
                  element={<ListeApparail role={role} />}
                />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
