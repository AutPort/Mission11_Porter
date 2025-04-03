import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import AddBookPage from './pages/AddBookPage';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<BooksPage />} />
            <Route path='/books' element={<BooksPage />} />
            <Route
              path='/addBook/:title/:bookID/:price'
              element={<AddBookPage />}
            />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/adminbooks' element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
