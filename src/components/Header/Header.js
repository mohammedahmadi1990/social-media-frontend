import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';

function Header({ isAuthenticated, username  }) {
  return (
    <header className="navigator container d-flex justify-content-between align-items-center py-3">
      <div className='comp-logo'>
        <img src={logo} alt="Social Media Logo" className="img-fluid" />
        <div className='company-title'>My Social Media</div>
      </div>
      <nav>
        {!isAuthenticated ? (
          <>
            <Link className="nav-item" to="/login">Login</Link>
            <Link className="nav-item" to="/register">Register</Link>
          </>
        ) : (
          <>
          {username && <span className="username">{username}</span>}
            <Link className="nav-item" to="/logout">Logout</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
