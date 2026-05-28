import { Route, Routes } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import CartPage from '../pages/CartPage';
import CheckoutRoute from './CheckoutRoute';
import NotFoundPage from '../pages/NotFoundPage';
import PaidChatRoute from './PaidChatRoute';
import PaidDeliveryRoute from './PaidDeliveryRoute';
import ProductDetailPage from '../pages/ProductDetailPage';
import OrdersPage from '../pages/OrdersPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/producto/:productId" element={<ProductDetailPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/registro" element={<AuthPage mode="register" />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutRoute />} />
      <Route path="/entregas" element={<PaidDeliveryRoute />} />
      <Route path="/entregas/:orderId" element={<PaidDeliveryRoute />} />
      <Route path="/puntos-entrega" element={<PaidDeliveryRoute />} />
      <Route path="/chat" element={<PaidChatRoute />} />
      <Route path="/chat/:orderId" element={<PaidChatRoute />} />
      <Route path="/mis-ordenes" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/mi-cuenta/*" element={<UserRoutes />} />
      <Route path="/mi-perfil/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
