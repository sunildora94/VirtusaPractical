import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    billing: {
      first_name: '',
      last_name: '',
      user_email: '',
      address_1: '',
      address_2: '',
      country: '',
      state: '',
      city: '',
    },
    shipping: {
      address_1: '',
      address_2: '',
      country: '',
      state: '',
      city: '',
    },
    payment: {
      payment_mode: '',
      payment_total: '',
      transaction_id: '',
    },
    orders: {
      products: [],
      order_total: '',
    },
  },
};

export const CheckoutReducer = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckout: (state, action) => {
      state.value = action.payload;
    },
    updateCheckout: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const getAllCheckoutData = (state) => state.checkout.value;
// Action creators are generated for each case reducer function
export const { setCheckout, updateCheckout } = CheckoutReducer.actions;

export default CheckoutReducer.reducer;
