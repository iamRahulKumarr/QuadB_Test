import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/auth';
import cartReducer from '../slice/cart';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
