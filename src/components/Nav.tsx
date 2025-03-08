import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../store/authSlice';
import { RootState } from '../store';

const Nav = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        console.log("slllsldsldflsdfsklk")
        dispatch<any>(logout());
    };

  return (
    <nav className="navbar">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
              Home
            </NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Leaderboard
            </NavLink>
            <NavLink to="/bet-history" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Bet History
            </NavLink>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
    </nav>
  )
}

export default Nav