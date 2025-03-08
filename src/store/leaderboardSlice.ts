import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LeaderboardApi } from '../api';
import { ILeaderboardEntry } from '../interfaces';

interface LeaderboardState {
  data: ILeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk to fetch the leaderboard via REST
export const fetchLeaderboard = createAsyncThunk('leaderboard/fetch', async (_, { rejectWithValue }) => {
  try {
    return await LeaderboardApi.fetchLeaderboard();
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch leaderboard');
  }
});

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    // For real-time updates from the socket
    setLeaderboardData: (state, action: PayloadAction<ILeaderboardEntry[]>) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action: PayloadAction<ILeaderboardEntry[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLeaderboardData } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
