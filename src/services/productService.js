import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (productId) => {
  try {
    const docSnap = await getDoc(doc(db, 'products', productId));
    return docSnap.exists() ? { id: productId, ...docSnap.data() } : null;
  } catch (error) {
    throw error;
  }
};

// Crear producto (solo admin/vendedor)
export const createProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Actualizar producto
export const updateProduct = async (productId, productData) => {
  try {
    await updateDoc(doc(db, 'products', productId), {
      ...productData,
      updatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs
      .filter(doc => doc.data().category === category)
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  } catch (error) {
    throw error;
  }
};
