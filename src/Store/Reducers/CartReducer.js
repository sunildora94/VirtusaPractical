import { createSlice } from '@reduxjs/toolkit';

const defaultProducts = [
  { id: 1, name: 'Cannon Printer', brief_desc: 'Ink Cartiage', price: 25 },
  { id: 2, name: 'Samsung Smart TV', brief_desc: '4K Ultra HD', price: 200 },
  {
    id: 3,
    name: 'Cannon EOS M50 Mark',
    brief_desc: '4K and vertical movies, live youtube streaming',
    price: 500,
  },
  {
    id: 4,
    name: 'Google Pixel 4A',
    brief_desc: 'Google pixel mobile phone',
    price: 999,
  },
];

const initialState = {
  products: defaultProducts,
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
    },
    loadDefaultProducts: (state, action) => {
      console.log('defaultProducts', defaultProducts)
      state.products = defaultProducts;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCart, updateCart, clearCart, loadDefaultProducts } = CartReducer.actions;

export default CartReducer.reducer;
