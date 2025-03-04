import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import './App.css';
import BetPage from './pages/BetPage';
import BetHistory from './pages/BetHistory';

const AppRoutes: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar">
        {user ? (
          <>
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
              Home
            </NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Leaderboard
            </NavLink>
            <NavLink to="/bet-history" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Bet History
            </NavLink>
            <button onClick={logout} className="nav-link logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
              Login
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Sign Up
            </NavLink>
          </>
        )}
      </nav>

      <div className="main-content">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/bet-history" element={<BetHistory />} /> {/* Bet History Route */}
              <Route path="/bet/:gameId" element={<BetPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
