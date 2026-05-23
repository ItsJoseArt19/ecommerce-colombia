import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import Queue from '../helpers/Queue';

// Cola de órdenes
const orderQueue = new Queue();

// Crear orden
export const createOrder = async (userId, items, total, shippingAddress) => {
  try {
    const order = {
      userId,
      items,
      total,
      shippingAddress,
      status: 'pending', // pending, processing, shipped, delivered
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Agregar a la cola de procesamiento
    orderQueue.enqueue(order);

    // Guardar en Firestore
    const docRef = await addDoc(collection(db, 'orders'), order);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Obtener órdenes del usuario
export const getUserOrders = async (userId) => {
  try {
    const q = query(collection(db, 'orders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// Actualizar estado de la orden
export const updateOrderStatus = async (orderId, status) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};

// Obtener la siguiente orden de la cola
export const getNextOrder = () => {
  return orderQueue.dequeue();
};

// Obtener todas las órdenes (admin)
export const getAllOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};
