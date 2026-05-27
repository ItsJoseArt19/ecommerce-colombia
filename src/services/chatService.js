import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, realtimeDB } from './firebaseConfig';
import { ref, push, onValue, set } from 'firebase/database';
import Stack from '../helpers/Stack';

// Pila para historial de mensajes
const messageHistory = new Stack();

// Crear conversación
export const createConversation = async (userId, vendorId) => {
  try {
    const conversation = {
      userId,
      vendorId,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'conversations'), conversation);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Enviar mensaje (en tiempo real con Firebase Realtime DB)
export const sendMessage = async (conversationId, senderId, message) => {
  try {
    const newMessage = {
      senderId,
      text: message,
      timestamp: new Date().toISOString(),
    };

    // Guardar en pila de historial
    messageHistory.push(newMessage);

    // Guardar en Realtime Database (para tiempo real)
    const messagesRef = ref(realtimeDB, `messages/${conversationId}`);
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, newMessage);

    return newMessage;
  } catch (error) {
    throw error;
  }
};

// Escuchar mensajes en tiempo real
export const listenToMessages = (conversationId, callback) => {
  try {
    const messagesRef = ref(realtimeDB, `messages/${conversationId}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        callback(messages);
      }
    });
    return unsubscribe;
  } catch (error) {
    throw error;
  }
};

// Obtener historial de conversaciones de un usuario
export const getUserConversations = async (userId) => {
  try {
    const q = query(
      collection(db, 'conversations'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// Obtener últimos mensajes de la pila
export const getMessageHistory = () => {
  return messageHistory.getAll();
};
