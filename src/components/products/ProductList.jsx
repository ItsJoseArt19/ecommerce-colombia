import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import Filters from './Filters';
import styles from './ProductList.module.scss';
import { DUMMY_PRODUCTS } from '../../data/dummyData';
import { buildProductRanking } from '../../helpers/commerceStructures';

export default function ProductList() {
  const [filters, setFilters] = useState({
    category: null,
    minPrice: 0,
    maxPrice: 500000,
    rating: 0,
    search: '',
  });
  const [sortBy, setSortBy] = useState('popular');
  const [addedProduct, setAddedProduct] = useState('');

  const sortedProducts = useMemo(() => {
    const filtered = DUMMY_PRODUCTS.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
      if (product.rating < filters.rating) return false;
      if (
        filters.search &&
        !`${product.name} ${product.vendor} ${product.category}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':
        return buildProductRanking(filtered);
      case 'newest':
        return [...filtered].sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [filters, sortBy]);

  const handleAdded = (name) => {
    setAddedProduct(name);
    window.setTimeout(() => setAddedProduct(''), 2200);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Filters filters={filters} setFilters={setFilters} />
      </aside>

      <div className={styles.main}>
        <div className={styles.header}>
          <div>
            <span>Catalogo</span>
            <h2>{sortedProducts.length} productos disponibles</h2>
          </div>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className={styles.sortSelect}
          >
            <option value="popular">Relevancia</option>
            <option value="newest">Mas nuevo</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="rating">Mejor calificacion</option>
          </select>
        </div>

        {addedProduct && (
          <div className={styles.toast}>{addedProduct} agregado al carrito.</div>
        )}

        {sortedProducts.length === 0 ? (
          <div className={styles.noResults}>
            <h3>No encontramos productos</h3>
            <p>Ajusta los filtros o limpia la busqueda para ver mas resultados.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdded={handleAdded} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
