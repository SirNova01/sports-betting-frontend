import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { placeBet, clearLastPlacedBet } from '../store/betsSlice';

interface SelectedBet {
  label: string;
  odds: number;
  type: 'home' | 'draw' | 'away';
}

export const GameDetailsPage: React.FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 1) Retrieve the game details from Redux (assuming we have them stored).
  // If they're not in the store, you might do an extra fetch via a thunk.
  const game = useSelector((state: RootState) => state.game.games[gameId || '']);

  // 2) Retrieve bet placement states from betsSlice
  const { loading: betLoading, error: betError, lastPlacedBet } = useSelector(
    (state: RootState) => state.bets
  );

  // 3) Local states for user’s bet slip
  const [selectedBet, setSelectedBet] = useState<SelectedBet | null>(null);
  const [stake, setStake] = useState<number>(0);

  // 4) Calculate potential winnings in real-time
  const potentialWinnings = selectedBet ? (stake * selectedBet.odds).toFixed(2) : '0.00';

  // (Optional) If you need to fetch the game details upon loading:
  // useEffect(() => {
  //   if (gameId && !game) {
  //     dispatch(fetchGameById(gameId));
  //   }
  // }, [gameId, game, dispatch]);

  // Clear bet slice state on unmount
  useEffect(() => {
    return () => {
      dispatch(clearLastPlacedBet());
    };
  }, [dispatch]);

  if (!game) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Game not found</h2>
        <p>Couldn’t locate game with ID: {gameId}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  // 5) Bet Placement Handler
  const handleConfirmBet = async () => {
    if (!gameId || !selectedBet) return;

    // Prepare the payload for /bets
    await dispatch(
      placeBet({
        bet: {
          game_id: gameId,
          amount: stake,
          odds: selectedBet.odds,
          bet_type: selectedBet.type,
        },
      })
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Game Details</h1>

      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
        <h2>
          {game.home_team} vs {game.away_team}
        </h2>
        <p>Score: {game.score}</p>
        <p>Minute: {game.minute}</p>
        <p>Status: {game.status}</p>
      </div>

      <div>
        <h3>Bet on Match Result</h3>
        <div style={{ display: 'flex', gap: '1rem', margin: '0.5rem 0' }}>
          {/* HOME WIN */}
          <button
            onClick={() =>
              setSelectedBet({
                label: `${game.home_team} Win`,
                odds: game.odds.home_win || 0,
                type: 'home',
              })
            }
            style={{
              border: '1px solid #ccc',
              padding: '0.5rem',
              backgroundColor: selectedBet?.label === `${game.home_team} Win` ? '#ADD8E6' : 'white',
            }}
          >
            {game.home_team} Win @ {game.odds.home_win?.toFixed(2)}
          </button>

          {/* DRAW */}
          <button
            onClick={() =>
              setSelectedBet({
                label: 'Draw',
                odds: game.odds.draw || 0,
                type: 'draw',
              })
            }
            style={{
              border: '1px solid #ccc',
              padding: '0.5rem',
              backgroundColor: selectedBet?.label === 'Draw' ? '#ADD8E6' : 'white',
            }}
          >
            Draw @ {game.odds.draw?.toFixed(2)}
          </button>

          {/* AWAY WIN */}
          <button
            onClick={() =>
              setSelectedBet({
                label: `${game.away_team} Win`,
                odds: game.odds.away_win || 0,
                type: 'away',
              })
            }
            style={{
              border: '1px solid #ccc',
              padding: '0.5rem',
              backgroundColor: selectedBet?.label === `${game.away_team} Win` ? '#ADD8E6' : 'white',
            }}
          >
            {game.away_team} Win @ {game.odds.away_win?.toFixed(2)}
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
        <h3>Your Bet Slip</h3>

        <p>
          Selected Bet: <strong>{selectedBet ? selectedBet.label : 'None'}</strong>
        </p>
        <p>
          Odds: <strong>{selectedBet ? selectedBet.odds.toFixed(2) : '--'}</strong>
        </p>
        <p>
          Stake: 
          <input
            type="number"
            style={{ marginLeft: '0.5rem' }}
            value={stake}
            onChange={(e) => setStake(Number(e.target.value))}
            placeholder="Amount"
            min={0}
          />
        </p>
        <p>
          Potential Winnings: <strong>${potentialWinnings}</strong>
        </p>

        {betError && <p style={{ color: 'red' }}>{betError}</p>}
        {lastPlacedBet && <p style={{ color: 'green' }}>{lastPlacedBet.message}</p>}

        <button
          onClick={handleConfirmBet}
          disabled={betLoading || !selectedBet}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: betLoading ? 'gray' : 'blue',
            color: 'white',
            border: 'none',
          }}
        >
          {betLoading ? 'Placing Bet...' : 'Confirm Bet'}
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};
