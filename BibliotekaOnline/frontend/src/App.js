import React from 'react'
import Library from './Library'
import BookForm from './BookForm'
import User from './User'

import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import ReadingRoom from './ReadingRoom'
import Menu from './Menu'
import Footer from './Footer'

const App = () => {
  const token = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <main>
        { token && <Menu/> }
        <Routes>
          { token && <Route path="/" element={<Library/>} />}
          { token && <Route path="/user" element={<User/>} />}
          { token && <Route path="/readingroom" element={<ReadingRoom/>} />}
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/bookForm" element={<BookForm/>} />
          <Route path="/" element={<Navigate replace to="/login"/>} />
          <Route path="/user" element={<Navigate replace to="/login"/>} />
          <Route path="/readingroom"  element={<Navigate replace to="/login"/>} />
        </Routes>
        { token && <Footer/> }
      </main>
    </BrowserRouter>
  )
}

export default App