import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin, userRegister } from '../../services/APIServices';

export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await userLogin(payload.email, payload.password);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await userRegister(
        payload.email,
        payload.password,
        payload.confirmPassword,
        payload.username
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    user: {},
    isLogged: false,
    token: null,
    error: null,
  },
  reducers: {
    setUserAuth: (state, action) => {
      const { id, email, username, userType, token } = action.payload;
      state.user = { id, email, username, userType };
      state.token = token;
      state.isLogged = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = {};
      state.error = '';
      state.token = '';
      state.status = 'idle';
      state.isLogged = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { username, userType, token, email, _id: id } = action.payload;
        state.user.id = id;
        state.user.username = username;
        state.user.email = email;
        state.user.userType = userType;
        state.token = token;
        state.status = 'idle';
        state.isLogged = true;
        localStorage.setItem('user_token', `Bearer ${token}`);
        localStorage.setItem(
          'user_info',
          JSON.stringify({ id, username, userType, email })
        );
        localStorage.setItem('isLoggedIn', 'true');
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'idle';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        const { username, userType, token, email, _id: id } = action.payload;
        state.user.id = id;
        state.user.username = username;
        state.user.email = email;
        state.user.userType = userType;
        state.token = token;
        state.status = 'idle';
        state.isLogged = true;
        localStorage.setItem('user_token', `Bearer ${token}`);
        localStorage.setItem(
          'user_info',
          JSON.stringify({ id, username, userType, email })
        );
        localStorage.setItem('isLoggedIn', 'true');
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'idle';
      }),
});
export const getUserId = (state) => state.auth.user.id;
export const getUserInfo = (state) => state.auth.user;
export const getUserToken = (state) => state.auth.token;
export const getIsLogged = (state) => state.auth.isLogged;
export const getAuthError = (state) => state.auth.error;

export const { setUserAuth, logout } = authSlice.actions;
export default authSlice.reducer;
