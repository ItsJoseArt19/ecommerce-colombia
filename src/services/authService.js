import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Registro de nuevo usuario
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualizar perfil
    await updateProfile(user, { displayName });

    // Crear documento de usuario en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      displayName,
      role: 'user', // Rol por defecto
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Obtener rol del usuario
export const getUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data().role : 'user';
  } catch (error) {
    throw error;
  }
};

// Actualizar perfil del usuario
export const updateUserProfile = async (uid, data) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: new Date(),
    }, { merge: true });
  } catch (error) {
    throw error;
  }
};
