import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map from './components/Map';
import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';
import Gamification from './components/Gamification';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1><b>Sustainable Sips & Bites</b></h1>
        </header>

        <div className="main-content">
          {/* Left side - Map */}
          <div className="map-wrapper">
            <Map />
          </div>

          {/* Right side - Navigation and Content */}
          <div className="right-content">
            <div className = "navbar ">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/gamification">Gamification</Link></li>
              </ul>
            </nav>
            </div>

            <div className="content-wrapper">
              <Routes>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/gamification" element={<Gamification />} />
                <Route path="/" element={
                  <div className="welcome-content">
                    <h1>"Every bite counts—stop wasting, start sharing!"</h1>
                    <h3>"Your leftovers could be someone’s next meal."</h3>
                    <p>Join us in saving food, saving money, and saving the planet.</p>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
