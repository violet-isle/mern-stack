import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreatePartners from './pages/CreatePartners'
import ShowPartner from './pages/ShowPartner'
import EditPartner from './pages/EditPartner'
import DeletePartner from './pages/DeletePartner'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/community-partners/create' element={<CreatePartners/>} />
      <Route path='/community-partners/details/:id' element={<ShowPartner/>} />
      <Route path='/community-partners/edit/:id' element={<EditPartner/>} />
      <Route path='/community-partners/delete/:id' element={<DeletePartner/>} />
    </Routes>
  )
}

export default App