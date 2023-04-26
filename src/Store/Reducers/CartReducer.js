import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const CartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.products = action.payload;
    },
    updateCart: (state, action) => {
      state.products = action.payload;
    },
    clearCart: (state, action) => {
      state.products = [];
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCart, updateCart, clearCart, loadDefaultProducts } = CartReducer.actions;

export default CartReducer.reducer;
