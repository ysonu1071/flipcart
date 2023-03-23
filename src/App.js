import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import CartPage from './components/CartPage';
import Home from './components/Home';
import Product from './components/Product';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path='/cartpage' element={<CartPage/>} />
          <Route path='*' element={<CartPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
