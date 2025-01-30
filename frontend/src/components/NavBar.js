import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Create a CSS file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Map</Link></li>
        <li><Link to="/gamification">Gamification</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/user-profile">User Profile</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
