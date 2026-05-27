import { CATEGORIES, PRICE_RANGES } from '../../data/dummyData';
import styles from './Filters.module.scss';

export default function Filters({ filters, setFilters }) {
  const updateFilters = (nextFilters) => setFilters({ ...filters, ...nextFilters });

  const handleReset = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        category: null,
        minPrice: 0,
        maxPrice: 500000,
        rating: 0,
        search: '',
      },
    });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <h3>Filtros</h3>
        <button className={styles.resetBtn} onClick={handleReset} type="button">
          Limpiar
        </button>
      </div>

      <label className={styles.search}>
        Buscar
        <input
          type="search"
          placeholder="Mochila, joyeria, hogar..."
          value={filters.search}
          onChange={(event) => updateFilters({ search: event.target.value })}
        />
      </label>

      <div className={styles.group}>
        <h4>Categoria</h4>
        {CATEGORIES.map((category) => (
          <button
            className={filters.category === category ? styles.activeChip : styles.chip}
            key={category}
            onClick={() =>
              updateFilters({ category: filters.category === category ? null : category })
            }
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.group}>
        <h4>Precio</h4>
        {PRICE_RANGES.map((range) => (
          <button
            className={
              filters.minPrice === range.min && filters.maxPrice === range.max
                ? styles.activeChip
                : styles.chip
            }
            key={range.label}
            onClick={() => updateFilters({ minPrice: range.min, maxPrice: range.max })}
            type="button"
          >
            {range.label}
          </button>
        ))}
      </div>

      <div className={styles.group}>
        <h4>Calificacion minima</h4>
        {[5, 4, 3].map((rating) => (
          <button
            className={filters.rating === rating ? styles.activeChip : styles.chip}
            key={rating}
            onClick={() => updateFilters({ rating: filters.rating === rating ? 0 : rating })}
            type="button"
          >
            {rating}+ estrellas
          </button>
        ))}
      </div>
    </div>
  );
}
