import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import gameReducer from './gameSlice';
import leaderboardReducer from './leaderboardSlice';
import betHistoryReducer from './betHistorySlice';
import betsReducer from './betsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
    betHistory: betHistoryReducer,
    bets: betsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
