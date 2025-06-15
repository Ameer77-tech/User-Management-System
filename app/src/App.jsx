import React from 'react'
import Home from './pages/Home'
import CreateUser from './pages/CreateUser'
import ViewUsers from './pages/ViewUsers'
import UpdateUser from './pages/UpdateUser'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/create' element={<CreateUser/>}></Route>
            <Route path='/users' element={<ViewUsers/>}></Route>
            <Route path='/updateuser' element={<UpdateUser/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App