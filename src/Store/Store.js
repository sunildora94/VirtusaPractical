import { configureStore } from '@reduxjs/toolkit';
import CheckoutReducer from './Reducers/CheckoutReducer';
import CartReducer from './Reducers/CartReducer';
import ProductsReducer from './Reducers/ProductsReducer';

export const store = configureStore({
  reducer: {
    checkout: CheckoutReducer,
    cart: CartReducer,
    products: ProductsReducer,
  },
});
