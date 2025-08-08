import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, 
    userAuth: false,
    token: null,
    loading: false,
    error: null
  },

  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.userAuth = true;
      state.token = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.accessToken);
    },
    logout(state) {
      state.user = null; 
      state.userAuth = false;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, setLoading, setError, clearError, updateUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user; 
export const selectUserAuth = (state) => state.auth.userAuth;
export const selectToken = (state) => state.auth.token;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer; 