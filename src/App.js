import './App.css';
import { Header, Footer } from './TemplateParts';
import { CheckoutPage } from './Components/Pages/Checkout';

function App() {
  return (
    <div className="bg-light">
      <Header />
      <div className="main-content">
        <CheckoutPage />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
