export function getLastPaidOrder() {
  try {
    const savedOrder = localStorage.getItem('lastOrder');
    if (!savedOrder) return null;
    const order = JSON.parse(savedOrder);
    return order?.paymentStatus === 'paid' && order?.chatEnabled ? order : null;
  } catch (error) {
    console.error('Error reading last order:', error);
    return null;
  }
}
