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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/registro" element={<AuthPage mode="register" />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutRoute />} />
      <Route path="/entregas" element={<PaidDeliveryRoute />} />
      <Route path="/chat" element={<PaidChatRoute />} />
      <Route path="/mi-cuenta/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
