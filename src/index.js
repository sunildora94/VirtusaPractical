import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Thankyou from './Components/Pages/Others/Thankyou';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import ErrorBoundary from './Components/ErrorBoundary';
import { store } from './Store/Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Payments } from './Components/Pages/Checkout';
import { ProductsList } from './Components/Pages/Products';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/checkout" element={<App />} />
            <Route path="/payment" element={<Payments />} />
            <Route path="/thankyou" element={<Thankyou />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Bootstrap checkout page link
// https://getbootstrap.com/docs/4.0/examples/checkout/
// https://dev.to/codebucks/form-validation-in-reactjs-by-building-reusable-custom-hook-1bg7

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
