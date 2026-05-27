import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import Filters from './Filters';
import styles from './ProductList.module.scss';
import { useProducts } from '../../hooks/useProducts';

export default function ProductList() {
  const { filteredProducts, filters, dispatch } = useProducts();
  const [sortBy, setSortBy] = useState('popular');

  // Aplicar ordenamiento a los productos filtrados
  const sortedProducts = useMemo(() => {
    let result = [...filteredProducts];

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return result;
  }, [filteredProducts, sortBy]);

  const handleViewDetails = (productId) => {
    console.log('Ver detalles del producto:', productId);
    // Aquí irá la navegación a detalles del producto
  };

  return (
    <div className={styles.container} id="product-list">
      <div className={styles.sidebar}>
        <Filters filters={filters} dispatch={dispatch} />
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
