import { configureStore } from '@reduxjs/toolkit';
import CheckoutReducer from './Reducers/CheckoutReducer';
import CartReducer from './Reducers/CartReducer';

export const store = configureStore({
  reducer: { checkout: CheckoutReducer, cart: CartReducer },
});
