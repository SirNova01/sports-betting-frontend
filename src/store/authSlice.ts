import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from '../api';
import {
  IAuthResponse,
  ILoginRequest,
  ISignupRequest,
  IUser
} from '../interfaces';

interface AuthState {
  user: IUser | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initialize token from localStorage if you want to persist sessions
const initialToken = localStorage.getItem('token');
const initialUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: initialUser ? JSON.parse(initialUser) : null,
  token: initialToken ?? null,
  status: 'idle',
  error: null,
};

/** LOGIN THUNK */
export const login = createAsyncThunk<
  IAuthResponse,     // Return type
  ILoginRequest      // Argument type
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await AuthApi.login(credentials);
    } catch (err: any) {
      // You could inspect err.response?.data for a specific message
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

/** SIGNUP THUNK */
export const signup = createAsyncThunk<
  IAuthResponse,
  ISignupRequest
>(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      return await AuthApi.signup(userData);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);

/** LOGOUT THUNK */
export const logout = createAsyncThunk<
  void,
  void,
  { state: { auth: AuthState } }
>(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) return;
      await AuthApi.logout(token);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  },
});

export default authSlice.reducer;
