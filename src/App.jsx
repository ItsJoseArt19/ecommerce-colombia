import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ChatProvider } from './context/ChatContext';
import { AdminProvider } from './context/AdminContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <ChatProvider>
              <AdminProvider>
                <AppRoutes />
              </AdminProvider>
            </ChatProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}
