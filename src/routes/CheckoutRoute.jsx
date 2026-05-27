import { Navigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutPage from '../pages/CheckoutPage';
import ProtectedRoute from './ProtectedRoute';

export default function CheckoutRoute() {
  const { items } = useCart();

  if (items.length === 0) {
    return <Navigate to="/carrito" replace />;
  }

  return (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  );
}
