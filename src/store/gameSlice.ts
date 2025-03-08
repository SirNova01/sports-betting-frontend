import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGamePayload } from '../interfaces';

interface GameState {
  games: Record<string, IGamePayload>;
}

const initialState: GameState = {
  games: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addOrUpdateGame: (state, action: PayloadAction<IGamePayload>) => {
      const game = action.payload;
      state.games[game.game_id] = game;
    },
  },
});

export const { addOrUpdateGame } = gameSlice.actions;
export default gameSlice.reducer;
