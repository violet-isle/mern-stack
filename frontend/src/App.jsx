import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home'
import CreatePartners from './pages/CreatePartners'
import ShowPartner from './pages/ShowPartner'
import EditPartner from './pages/EditPartner'
import DeletePartner from './pages/DeletePartner'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar';

//routes to the various pages 
export const App = () => {
  const {user} = useAuthContext()

  return (
    <div>
    <Navbar />
    <Routes>
      <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>} />
      <Route path='/community-partners/create' element={<CreatePartners/>} />
      <Route path='/community-partners/details/:id' element={<ShowPartner/>} />
      <Route path='/community-partners/edit/:id' element={<EditPartner/>} />
      <Route path='/community-partners/delete/:id' element={<DeletePartner/>} />
      <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>} />
      <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>} />
    </Routes>
    </div>
  )
}

export default App