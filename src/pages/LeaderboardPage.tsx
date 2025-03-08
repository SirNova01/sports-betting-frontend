import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard, setLeaderboardData } from '../store/leaderboardSlice';
import { RootState, AppDispatch } from '../store';
import { useSocket } from '../hooks/useSocket';
import { useSocketEvent } from '../hooks/useSocketEvent';
import { ILeaderboardEntry } from '../interfaces';
import Nav from '../components/Nav';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://127.0.0.1:8080';

export const LeaderboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.leaderboard);

  useSocket(SOCKET_SERVER_URL);

  useSocketEvent<ILeaderboardEntry[]>('leaderboard_update', (updatedData) => {
    dispatch(setLeaderboardData(updatedData));
  });

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <>
      <Nav />
      <div style={{ padding: '1rem' }}>
        <h1>Leaderboard</h1>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && data.length === 0 && <p>No leaderboard data yet.</p>}
        <ul>
          {data.map((entry) => (
            <li key={entry.user_id}>
              {entry.name} - payout: {entry.total_payout}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
