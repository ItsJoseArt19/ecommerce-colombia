import { Navigate, useParams } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import { getStoredOrders } from '../helpers/localOrders';
import ProtectedRoute from './ProtectedRoute';

export default function PaidChatRoute() {
  const { orderId } = useParams();
  const paidOrders = getStoredOrders().filter(
    (order) => order.paymentStatus === 'paid' && order.chatEnabled
  );

  if (paidOrders.length === 0) {
    return <Navigate to="/carrito" replace state={{ reason: 'chat-requires-paid-order' }} />;
  }

  return (
    <ProtectedRoute>
      <ChatPage initialOrderId={orderId} paidOrders={paidOrders} />
    </ProtectedRoute>
  );
}
