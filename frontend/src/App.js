import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './components/Map';
import Gamification from './components/Gamification';
import Leaderboard from './components/Leaderboard';
import UserProfile from './components/UserProfile';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <header className="App-header">
          <h1>Sustainable Sips and Bites</h1>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
