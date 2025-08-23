import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const loginAdmin = createAsyncThunk('auth/login', async (credentials) => {
  const { data } = await axios.post('/login', credentials);
  return data.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: builder => {
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.token = action.payload;
      console.log('state.token', state.token)
      state.isAuthenticated = true;
      console.log(' state.isAuthenticated',  state.isAuthenticated)
      localStorage.setItem('token', action.payload);
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
