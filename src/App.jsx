import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ChatProvider } from './context/ChatContext';
import { AdminProvider } from './context/AdminContext';
import HomePage from './pages/HomePage';
import './App.css';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <ChatProvider>
              <AdminProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </AdminProvider>
            </ChatProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}
