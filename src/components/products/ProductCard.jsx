import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

const formatCurrency = (value) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export default function ProductCard({ product, onAdded }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        vendor: product.vendor,
      },
    });
    onAdded(product.name);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <span className={styles.badge}>{product.badge}</span>
        {!product.inStock && <span className={styles.outOfStock}>Agotado</span>}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{product.category}</span>
          <small>{product.location}</small>
        </div>
        <h3>
          <Link to={`/producto/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{product.description}</p>

        <div className={styles.rating}>
          <strong>{product.rating.toFixed(1)}</strong>
          <span>{product.reviews} reseñas</span>
        </div>

        <div className={styles.vendor}>
          <span>{product.vendor}</span>
          <small>{product.delivery}</small>
        </div>

        <div className={styles.priceRow}>
          <div>
            <strong>{formatCurrency(product.price)}</strong>
            {product.previousPrice > 0 && <span>{formatCurrency(product.previousPrice)}</span>}
          </div>
          <button onClick={handleAddToCart} disabled={!product.inStock} type="button">
            Agregar
          </button>
        </div>
        <span className={styles.chatLink}>Chat disponible despues del pago</span>
      </div>
    </article>
  );
}
