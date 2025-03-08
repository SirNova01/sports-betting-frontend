import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBetRequest, IPlaceBetResponse } from '../interfaces';
import { BetsApi } from '../api';

interface BetsState {
  loading: boolean;
  error: string | null;
  lastPlacedBet: IPlaceBetResponse | null;  // store the last placed bet info, if desired
}

const initialState: BetsState = {
  loading: false,
  error: null,
  lastPlacedBet: null,
};

// Thunk to place bet
export const placeBet = createAsyncThunk(
  'bets/placeBet',
  async (betData: IBetRequest, { rejectWithValue }) => {
    try {
      return await BetsApi.placeBet(betData);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to place bet');
    }
  }
);

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    clearLastPlacedBet: (state) => {
      state.lastPlacedBet = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeBet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastPlacedBet = null;
      })
      .addCase(placeBet.fulfilled, (state, action: PayloadAction<IPlaceBetResponse>) => {
        state.loading = false;
        state.lastPlacedBet = action.payload;
      })
      .addCase(placeBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLastPlacedBet } = betsSlice.actions;
export default betsSlice.reducer;
