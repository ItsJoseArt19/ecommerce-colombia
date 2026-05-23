import { createContext, useReducer } from 'react';

export const AdminContext = createContext();

const initialState = {
  statistics: {
    totalSales: 0,
    totalOrders: 0,
    topProducts: [],
    topCustomers: [],
  },
  orders: [],
  users: [],
  products: [],
  loading: false,
  error: null,
};

function adminReducer(state, action) {
  switch (action.type) {
    case 'SET_STATISTICS':
      return {
        ...state,
        statistics: action.payload,
      };
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}
