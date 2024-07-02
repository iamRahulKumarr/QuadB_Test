import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addToCart as addToCartAPI,
  fetchCart,
  updateCart,
} from '../../services/APIServices';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addToCartAPI(payload.userId, payload.productId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const addToCartOnLogin = createAsyncThunk(
  'cart/addToCartOnLogin',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCart();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await updateCart(payload.cartId, payload.quantity);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [], status: 'idle', error: null },
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart = [...state.cart, action.payload];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addToCartOnLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartOnLogin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart = [...state.cart, action.payload];
      })
      .addCase(addToCartOnLogin.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.status = 'idle';
        state.cart = [...state.cart].map((item) =>
          item.product === updateCartItem.product._id ? updatedItem : item
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const getCartStats = (state) => state.cart;
export const getCartItems = (state) => state.cart.cart;

export const getCartItem = (state, productId) =>
  state.cart.cart.find((item) => item.product === productId);

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
