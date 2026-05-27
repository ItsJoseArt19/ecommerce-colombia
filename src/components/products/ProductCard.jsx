import { useCart } from '../../hooks/useCart';
import styles from './ProductCard.module.scss';

export default function ProductCard({ product, onViewDetails }) {
  const { dispatch } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    });
    alert('Producto agregado al carrito');
  };

  const renderRating = (rating) => {
    const stars = Math.round(rating);
    return '⭐'.repeat(stars);
  };

  return (
    <div className={styles.card} onClick={() => onViewDetails(product.id)}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        {!product.inStock && <div className={styles.outOfStock}>Agotado</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.rating}>
          <span className={styles.stars}>{renderRating(product.rating)}</span>
          <span className={styles.count}>({product.reviews})</span>
        </div>

        <div className={styles.vendor}>
          <small>Por: {product.vendor}</small>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>
            ${product.price.toLocaleString('es-CO')}
          </span>
          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Agregar' : 'No disponible'}
          </button>
        </div>
      </div>
    </div>
  );
}
