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
  {
    id: 5,
    name: 'Google Pixel 5A',
    brief_desc: 'Google pixel mobile phone',
    price: 1500,
  },
  {
    id: 6,
    name: 'Google Pixel 6A',
    brief_desc: 'Google pixel mobile phone',
    price: 1700,
  },
  {
    id: 7,
    name: 'Google Pixel 7A',
    brief_desc: 'Google pixel mobile phone',
    price: 2000,
  },
  {
    id: 8,
    name: 'Cannon EOS 1300D',
    brief_desc: '4K Photo click',
    price: 900,
  },
];

const initialState = {
  value: defaultProducts,
};

export const ProductsReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
    },
    updateProducts: (state, action) => {
      state.value = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCart, updateCart, clearCart, loadDefaultProducts } = ProductsReducer.actions;

export default ProductsReducer.reducer;
