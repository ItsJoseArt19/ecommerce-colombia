import { Navigate } from 'react-router-dom';
import DeliveryPage from '../pages/DeliveryPage';
import { getLastPaidOrder } from '../helpers/orders';
import ProtectedRoute from './ProtectedRoute';

export default function PaidDeliveryRoute() {
  const paidOrder = getLastPaidOrder();

  if (!paidOrder) {
    return <Navigate to="/carrito" replace state={{ reason: 'delivery-requires-paid-order' }} />;
  }

  return (
    <ProtectedRoute>
      <DeliveryPage paidOrder={paidOrder} />
    </ProtectedRoute>
  );
}
