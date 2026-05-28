const ORDERS_KEY = 'orders';
const LAST_ORDER_KEY = 'lastOrder';
const TRACKING_KEY = 'trackingProgress';
const CHAT_KEY = 'orderChats';

export function getStoredOrders() {
  try {
    const savedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    const legacyLastOrder = JSON.parse(localStorage.getItem(LAST_ORDER_KEY) || 'null');
    const orders = Array.isArray(savedOrders)
      ? savedOrders
      : savedOrders?.id
        ? [savedOrders]
        : [];
    const mergedOrders = legacyLastOrder?.id ? [legacyLastOrder, ...orders] : orders;
    const uniqueOrders = mergedOrders.filter(
      (order, index, list) =>
        order?.id && list.findIndex((item) => String(item.id) === String(order.id)) === index
    );

    if (!Array.isArray(savedOrders) || uniqueOrders.length !== orders.length) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(uniqueOrders));
    }

    return uniqueOrders;
  } catch (error) {
    console.error('Error reading stored orders:', error);
    return [];
  }
}

export function saveStoredOrder(order) {
  const orders = getStoredOrders();
  const nextOrders = [order, ...orders.filter((item) => item.id !== order.id)];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(nextOrders));
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  return nextOrders;
}

export function getLastStoredOrder() {
  try {
    const order = JSON.parse(localStorage.getItem(LAST_ORDER_KEY) || 'null');
    return order;
  } catch (error) {
    console.error('Error reading last order:', error);
    return null;
  }
}

export function getStoredOrderById(orderId) {
  return getStoredOrders().find((order) => String(order.id) === String(orderId)) || null;
}

export function getPaidOrderById(orderId) {
  const order = orderId ? getStoredOrderById(orderId) : getLastStoredOrder();
  return order?.paymentStatus === 'paid' ? order : null;
}

function readJsonMap(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    return value && typeof value === 'object' ? value : {};
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return {};
  }
}

function writeJsonMap(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getOrderTrackingProgress(orderId) {
  const progressMap = readJsonMap(TRACKING_KEY);
  return progressMap[orderId] || { markerIndex: 0, simulatedDay: 1, completed: false };
}

export function saveOrderTrackingProgress(orderId, progress) {
  const progressMap = readJsonMap(TRACKING_KEY);
  progressMap[orderId] = {
    ...progressMap[orderId],
    ...progress,
    updatedAt: new Date().toISOString(),
  };
  writeJsonMap(TRACKING_KEY, progressMap);
  return progressMap[orderId];
}

export function getOrderChatMessages(orderId) {
  const chatMap = readJsonMap(CHAT_KEY);
  return Array.isArray(chatMap[orderId]) ? chatMap[orderId] : [];
}

export function saveOrderChatMessages(orderId, messages) {
  const chatMap = readJsonMap(CHAT_KEY);
  chatMap[orderId] = messages;
  writeJsonMap(CHAT_KEY, chatMap);
  return messages;
}
