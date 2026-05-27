import { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function calculateCart(items) {
  return {
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
  };
}

function getInitialCartState() {
  try {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return initialState;
    const parsedCart = JSON.parse(savedCart);
    return calculateCart(Array.isArray(parsedCart.items) ? parsedCart.items : []);
  } catch (error) {
    console.error('Error loading cart:', error);
    return initialState;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return calculateCart(
          state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        );
      }
      return calculateCart([
        ...state.items,
        { ...action.payload, quantity: action.payload.quantity || 1 },
      ]);
    }
    case 'REMOVE_ITEM':
      return calculateCart(state.items.filter(item => item.id !== action.payload));
    case 'UPDATE_QUANTITY':
      return calculateCart(
        state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      );
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, getInitialCartState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
