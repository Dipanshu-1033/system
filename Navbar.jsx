
import React from 'react';
import { authService } from '../services/authService';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>HealthTracker</h2>
        </div>
        {user && (
          <div className="navbar-menu">
            <span className="navbar-user">Welcome, {user.firstName}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
