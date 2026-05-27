import { Navigate } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import { getLastPaidOrder } from '../helpers/orders';
import ProtectedRoute from './ProtectedRoute';

export default function PaidChatRoute() {
  const paidOrder = getLastPaidOrder();

  if (!paidOrder) {
    return <Navigate to="/carrito" replace state={{ reason: 'chat-requires-paid-order' }} />;
  }

  return (
    <ProtectedRoute>
      <ChatPage paidOrder={paidOrder} />
    </ProtectedRoute>
  );
}
