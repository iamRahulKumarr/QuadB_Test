import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addToCart as addToCartAPI,
  fetchCart,
  removeItemFromCart,
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

export const addToCartWhileLogged = createAsyncThunk(
  'cart/addToCartWhileLogged',
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

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (payload, { rejectWithValue }) => {
    try {
      await removeItemFromCart(payload.cartId);
      return null;
    } catch (err) {
      rejectWithValue(err.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [], status: 'idle', error: null },
  reducers: {
    addProduct: (state, action) => {
      const product = { ...action.payload };
      console.log(state.cart, product);
      state.cart = [...state.cart, { product }];
    },
    removeProduct: (state, action) => {
      state.cart = [...state.cart].filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.status = 'idle';
      state.error = null;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.status = 'idle';
        // state.cart = [...state.cart, action.payload];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addToCartWhileLogged.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartWhileLogged.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart = action.payload;
      })
      .addCase(addToCartWhileLogged.rejected, (state, action) => {
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
          item._id === updatedItem._id ? updatedItem : item
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const getCartStats = (state) => state.cart;
export const getCartItems = (state) => state.cart.cart;

export const getCartItem = (state, productId) =>
  state.cart.cart.find((item) => item.product._id === productId);

export const getCartItemQuantity = (state, cartId) =>
  state.cart.cart.find((item) => item._id === cartId);

export const { addProduct, removeProduct, clearCart, clearCartError } =
  cartSlice.actions;
export default cartSlice.reducer;
