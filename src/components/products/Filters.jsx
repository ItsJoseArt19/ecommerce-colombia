import { CATEGORIES, PRICE_RANGES } from '../../data/dummyData';
import styles from './Filters.module.scss';

export default function Filters({ filters, setFilters }) {
  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category: filters.category === category ? null : category,
    });
  };

  const handlePriceChange = (min, max) => {
    setFilters({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleRatingChange = (rating) => {
    setFilters({
      ...filters,
      rating: filters.rating === rating ? 0 : rating,
    });
  };

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
  };

  const handleReset = () => {
    setFilters({
      category: null,
      minPrice: 0,
      maxPrice: 500000,
      rating: 0,
      search: '',
    });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <h3>Filtros</h3>
        <button className={styles.resetBtn} onClick={handleReset}>
          Limpiar
        </button>
      </div>

      {/* Búsqueda */}
      <div className={styles.filterGroup}>
        <label>Buscar</label>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={filters.search}
          onChange={handleSearchChange}
          className={styles.input}
        />
      </div>

      {/* Categorías */}
      <div className={styles.filterGroup}>
        <h4>Categoría</h4>
        {CATEGORIES.map(category => (
          <label key={category} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.category === category}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Precio */}
      <div className={styles.filterGroup}>
        <h4>Precio</h4>
        {PRICE_RANGES.map((range, idx) => (
          <label key={idx} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.minPrice === range.min && filters.maxPrice === range.max}
              onChange={() => handlePriceChange(range.min, range.max)}
            />
            {range.label}
          </label>
        ))}
      </div>

      {/* Calificación */}
      <div className={styles.filterGroup}>
        <h4>Calificación</h4>
        {[5, 4, 3, 2, 1].map(rating => (
          <label key={rating} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.rating === rating}
              onChange={() => handleRatingChange(rating)}
            />
            {'⭐'.repeat(rating)} y arriba
          </label>
        ))}
      </div>
    </div>
  );
}
