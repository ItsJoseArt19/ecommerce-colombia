import { Navigate, useParams } from 'react-router-dom';
import DeliveryPage from '../pages/DeliveryPage';
import { getStoredOrders } from '../helpers/localOrders';
import ProtectedRoute from './ProtectedRoute';

export default function PaidDeliveryRoute() {
  const { orderId } = useParams();
  const paidOrders = getStoredOrders().filter((order) => order.paymentStatus === 'paid');

  if (paidOrders.length === 0) {
    return <Navigate to="/carrito" replace state={{ reason: 'delivery-requires-paid-order' }} />;
  }

  return (
    <ProtectedRoute>
      <DeliveryPage initialOrderId={orderId} paidOrders={paidOrders} />
    </ProtectedRoute>
  );
}
