import { getPaidOrderById } from './localOrders';

export function getLastPaidOrder(orderId) {
  const order = getPaidOrderById(orderId);
  return order?.chatEnabled ? order : null;
}
