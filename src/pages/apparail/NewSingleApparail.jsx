import React, { useEffect, useState } from 'react';
import Armoir from './composant/armoir';
import CompteurIoT from './composant/CompteurIoT';
import Transformteur from './composant/Transformteur';
import newRequest from '../../utils/newRequest';
import Sidebar from '../../component/sidebar/Sidebar';


export default function NewSingleApparail({ role }) {
  const accessToken = localStorage.getItem('accessToken')
  const [typeData, setTypeData] = useState();
  const [formData, setFormData] = useState({
    idslave: '',
    device_name: '',    
    manufacturer: '',
    location: '',
    description: '',
    typeDevice: '',
    selectedUser: '', // Ajout de l'état pour l'ID de l'utilisateur sélectionné
  });
  const [users,setUsers] = useState([])

  useEffect(()=> 
    {
      const getAllusers = async () => {
        console.log(accessToken)                          
        const res = await newRequest.get('/user', {
          headers : {
            Authorization:`Bearer ${accessToken}`
          }
        })
        console.log(res.data.users)
        setUsers(res.data.users)
      }
      getAllusers()
    },[])
                              
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setFormData({ ...formData, selectedUser: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newRequest
      .post('/app/add', { ...formData, device: { ...typeData } })
      .then((res) => {
        console.log(res.data);
        alert('Votre appareil a été ajouté avec succès');
      })
      .catch((err) => console.log(err));
  };

  const gouvernerats = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kébili',
    'Le Kef',
    'Mahdia',
    'La Manouba',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];

  // const users = [
  //   {
  //     _id: '66280712c276859d2911e034',
  //     username: 'samar',
  //     role: 'admin',
  //     email: 'samarsalhi2024@gmail.com',
  //   },
  //   {
  //     _id: '66280ac0f4447b846f7d7902',
  //     username: 'thouraya',
  //     role: 'supervisor',
  //     email: 'thouraya@gmail.com',
  //   },
  //   {
  //     _id: '662813e5c6c6b357cefe11a9',
  //     username: 'oussama',
  //     role: 'engineer',
  //     email: 'ousama@gmail.com',
  //   },
  //   {
  //     _id: '662a621f18a760415216e713',
  //     username: 'samar',
  //     role: 'admin',
  //     email: 'samar123@gmail.com',
  //   },
  //   {
  //     _id: '662ab2283f16c7089883f62a',
  //     username: 'samar',
  //     role: 'admin',
  //     email: 'samar120@gmail.com',
  //   },
  // ];

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <form onSubmit={handleSubmit} className="p-3 m-3 ">
          <div className="form-group">
            <label>Utilisateur:</label>
            <select
              className="form-control"
              name="selectedUser"
              value={formData.selectedUser}
              onChange={handleUserChange}
            >
              <option value="">Sélectionnez un utilisateur</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Id Slave:</label>
            <input
              type="text"
              className="form-control"
              name="idslave"
              value={formData.idslave}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Device Name:</label>
            <input
              type="text"
              className="form-control"
              name="device_name"
              value={formData.device_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Manufacturer:</label>
            <input
              type="text"
              className="form-control"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <select
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un gouvernorat</option>
              {gouvernerats.map((gouvernerat) => (
                <option key={gouvernerat} value={gouvernerat}>
                  {gouvernerat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Type Device:</label>
            <select
              className="form-control"
              name="typeDevice"
              value={formData.typeDevice}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un type de device</option>
              <option value="armoire">Armoire</option>
              <option value="groupe">Groupe électrogène</option>
              <option value="transformateur">Transformateur</option>
            </select>
          </div>
          {formData.typeDevice === 'armoire' ? (
            <Armoir FormArmoir={setTypeData} />
          ) : formData.typeDevice === 'groupe' ? (
            <CompteurIoT CompteurIoT={setTypeData} />
          ) : formData.typeDevice === 'transformateur' ? (
            <Transformteur Transformteur={setTypeData} />
          ) : null}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}