import { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case 'CLEAR_CART':
      return initialState;
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persistir carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Calcular total e itemCount
  useEffect(() => {
    const newTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newItemCount = state.items.reduce((count, item) => count + item.quantity, 0);

    if (newTotal !== state.total || newItemCount !== state.itemCount) {
      dispatch({
        type: 'LOAD_CART',
        payload: {
          ...state,
          total: newTotal,
          itemCount: newItemCount,
        },
      });
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
