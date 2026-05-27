import { useState } from 'react';
import ProductCard from './ProductCard';
import Filters from './Filters';
import styles from './ProductList.module.scss';
import { DUMMY_PRODUCTS } from '../../data/dummyData';

export default function ProductList() {
  const [products] = useState(DUMMY_PRODUCTS);
  const [filters, setFilters] = useState({
    category: null,
    minPrice: 0,
    maxPrice: 500000,
    rating: 0,
    search: '',
  });
  const [sortBy, setSortBy] = useState('popular');

  // Aplicar filtros
  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
    if (product.rating < filters.rating) return false;
    if (
      filters.search &&
      !product.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Aplicar ordenamiento
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleViewDetails = (productId) => {
    console.log('Ver detalles del producto:', productId);
    // Aquí irá la navegación a detalles del producto
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h2>Productos ({sortedProducts.length})</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="popular">Más Popular</option>
            <option value="newest">Más Nuevo</option>
            <option value="price-asc">Menor Precio</option>
            <option value="price-desc">Mayor Precio</option>
            <option value="rating">Mayor Calificación</option>
          </select>
        </div>

        {sortedProducts.length === 0 ? (
          <div className={styles.noResults}>
            <p>No se encontraron productos con los filtros seleccionados</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
