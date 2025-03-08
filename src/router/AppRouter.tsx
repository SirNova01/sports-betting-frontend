import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LeaderboardPage } from '../pages/LeaderboardPage';
import { OtherPage } from '../pages/OtherPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { BetHistoryPage } from '../pages/BetHistoryPage';
import { GameDetailsPage } from '../pages/GameDetailsPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/bet-history"
          element={
            <ProtectedRoute>
              <BetHistoryPage />
            </ProtectedRoute>
          } 
        />

        {/* Game details */}
        <Route path="/games/:gameId" element={<GameDetailsPage />} />
        
        {/* <Route path="/other" element={<OtherPage />} /> */}

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};
