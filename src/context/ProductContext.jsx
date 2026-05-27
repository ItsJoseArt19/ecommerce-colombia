import { createContext, useReducer, useEffect } from 'react';
import { DUMMY_PRODUCTS } from '../data/dummyData';

export const ProductContext = createContext();

const initialState = {
  products: DUMMY_PRODUCTS,
  filteredProducts: DUMMY_PRODUCTS,
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: 0,
    maxPrice: 500000,
    rating: 0,
    search: '',
  },
};

function productReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        loading: false,
      };
    case 'SET_FILTERED_PRODUCTS':
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
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
        loading: false,
      };
    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    const applyFilters = () => {
      let filtered = state.products;

      // Filtrar por categoría
      if (state.filters.category) {
        filtered = filtered.filter(p => p.category === state.filters.category);
      }

      // Filtrar por precio
      filtered = filtered.filter(
        p => p.price >= state.filters.minPrice && p.price <= state.filters.maxPrice
      );

      // Filtrar por calificación
      if (state.filters.rating > 0) {
        filtered = filtered.filter(p => (p.rating || 0) >= state.filters.rating);
      }

      // Filtrar por búsqueda
      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase();
        filtered = filtered.filter(
          p =>
            p.name.toLowerCase().includes(searchLower) ||
            (p.description && p.description.toLowerCase().includes(searchLower))
        );
      }

      dispatch({ type: 'SET_FILTERED_PRODUCTS', payload: filtered });
    };

    applyFilters();
  }, [state.filters, state.products]);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}
