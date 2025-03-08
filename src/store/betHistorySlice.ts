import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BetHistoryApi } from '../api';
import { IBet } from '../interfaces';

interface BetHistoryState {
  bets: IBet[];
  loading: boolean;
  error: string | null;
}

const initialState: BetHistoryState = {
  bets: [],
  loading: false,
  error: null,
};

// Async thunk to fetch bets from REST
export const fetchBetHistory = createAsyncThunk(
  'betHistory/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await BetHistoryApi.fetchBetHistory();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bet history');
    }
  }
);

export const betHistorySlice = createSlice({
  name: 'betHistory',
  initialState,
  reducers: {

    setBetHistory: (state, action: PayloadAction<IBet[]>) => {
      state.bets = action.payload;
    },

    updateSingleBet: (state, action: PayloadAction<IBet>) => {
      const updatedBet = action.payload;
      const index = state.bets.findIndex((b) => b.id === updatedBet.id);
      if (index >= 0) {
        state.bets[index] = updatedBet;
      } else {
        state.bets.push(updatedBet);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBetHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBetHistory.fulfilled, (state, action: PayloadAction<IBet[]>) => {
        state.loading = false;
        state.bets = action.payload;
      })
      .addCase(fetchBetHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBetHistory, updateSingleBet } = betHistorySlice.actions;
export default betHistorySlice.reducer;
