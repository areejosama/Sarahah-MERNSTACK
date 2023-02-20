import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({loggedinuser, logout}) {
  return (
    <div className='nabvar px-2 fixed-top'>
  <nav className="navbar navbar-expand-lg ">
    <div className="container">
      <Link className="navbar-brand text-light fs-4 fw-bolder" to ='signup'><img src='./images/Logo.png'/> Sarahah</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      {!loggedinuser? 
      <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <Link className="nav-link active text-light fs-6 me-3" aria-current="page" to='signup'> <i className="fa-solid fa-user"></i> Signup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light fs-6 me-3" to='login'><i className="fa-solid fa-lock"></i> Login</Link>
            </li>
          <li className="nav-item">
            <Link className="nav-link text-light fs-6 me-3" to='contact'><i className="fa-solid fa-phone-flip"></i> Contact Us</Link>
          </li>
        </ul>
      </div>
:
<ul className="navbar-nav ms-auto">
    <li className="nav-item">
        <Link className="nav-link active text-light fs-6 me-3" aria-current="page" to='account'><i className="fa-solid fa-gear"></i> Account Settings</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-light fs-6 me-3" to='messages'><i className="fa-solid fa-message"></i> My Messages</Link>
      </li>
    <li className="nav-item">
      <Link className="nav-link text-light fs-6 me-3" to='contact'><i className="fa-solid fa-phone-flip"></i> Contact Us</Link>
    </li>
    <li className="nav-item">
        <a className="nav-link text-light fs-6 me-3" onClick={logout}><i className="fa-solid fa-lock"></i> Logout</a>
      </li>
  </ul>
}
      
    </div>
  </nav>
</div>

  )
}
