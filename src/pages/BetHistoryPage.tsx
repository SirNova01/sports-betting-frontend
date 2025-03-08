import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetHistory } from '../store/betHistorySlice';
import { RootState, AppDispatch } from '../store';
import Nav from '../components/Nav';


export const BetHistoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bets, loading, error } = useSelector((state: RootState) => state.betHistory);

  useEffect(() => {
    dispatch(fetchBetHistory());
  }, [dispatch]);

  return (
    <>
        <Nav />
        <div style={{ padding: '1rem' }}>
        <h1>Bet History</h1>

        {loading && <p>Loading bet history...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && bets.length === 0 && <p>No bets found.</p>}

        {bets.map((bet) => (
            <div key={bet.id} style={{ border: '1px solid #ccc', margin: '0.5rem 0', padding: '0.5rem' }}>
            <p>Game ID: {bet.game_id}</p>
            <p>Amount: {bet.amount}</p>
            <p>Odds: {bet.odds}</p>
            <p>Potential Payout: {bet.potential_payout}</p>
            <p>Status: {bet.status}</p>
            <p>Bet Type: {bet.bet_type}</p>
            <small>Created: {new Date(bet.created_at).toLocaleString()}</small><br />
            <small>Updated: {new Date(bet.updated_at).toLocaleString()}</small>
            </div>
        ))}
        </div>
    </>
  );
};
