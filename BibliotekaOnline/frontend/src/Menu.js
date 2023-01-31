import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light container-flex d-flex justify-content-center">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to='/'>Biblioteka</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to='/ReadingRoom'>Czytelnia</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to='/User'>Użytkownik</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" onClick={handleLogout}>Wyloguj się</Link>
      </li>
    </ul>
</nav>
  )
}

export default Menu