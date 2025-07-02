import React from 'react'
import Home from './pages/Home'
import CreateUser from './pages/CreateUser'
import ViewUsers from './pages/ViewUsers'
import UpdateUser from './pages/UpdateUser'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/users' element={<ViewUsers />} />
        <Route path='/updateuser/:id' element={<UpdateUser />} />
      </Routes>
    </AnimatePresence>
  )
}

const App = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
)

export default App