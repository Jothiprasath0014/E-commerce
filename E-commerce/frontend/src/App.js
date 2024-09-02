import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Home from './pages/home';
import ProductDetail from './pages/productDetail';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import Cart from './pages/cart';
import ConfirmationPage from './components/confirmation';
import PaymentModal from './components/paymentModel';
import CardDetails from './components/cardDetails';
import ShippingDetails from './components/shippingDetails';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [animateCart, setAnimateCart] = useState(false);
  const amount = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty || 0), 0);

  function triggerCartAnimation() {
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 500);
  }

  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer theme='dark' position='top-center'/>
          <Header cartItems={cartItems} animateCart={animateCart} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} triggerCartAnimation={triggerCartAnimation} />} />
            <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}/>
            <Route path='/payment' element={<PaymentModal />} />
            <Route path='/card-details' element={<CardDetails />} />
            <Route path='/shipping-details' element={<ShippingDetails cartItems={cartItems} amount={amount} />} />
            <Route path='/confirmation' element={<ConfirmationPage />} /> 
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

