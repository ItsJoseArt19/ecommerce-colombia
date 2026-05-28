import { Link, useParams } from 'react-router-dom';
import Header from '../components/shared/Header';
import { useCart } from '../hooks/useCart';
import { DUMMY_PRODUCTS } from '../data/dummyData';
import { useProducts } from '../hooks/useProducts';
import styles from './SimplePage.module.scss';

const formatCurrency = (value) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { dispatch } = useCart();
  const { products } = useProducts();
  const catalogProducts = products?.length ? products : DUMMY_PRODUCTS;
  const product = catalogProducts.find((item) => String(item.id) === String(productId));

  if (!product) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.panel}>
          <span>Producto</span>
          <h1>No encontrado</h1>
          <p>El producto solicitado no existe en el catalogo.</p>
          <Link to="/">Volver al catalogo</Link>
        </main>
      </div>
    );
  }

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: 1,
        vendor: product.vendor,
      },
    });
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.detailPanel}>
        <img src={product.image} alt={product.name} />
        <section>
          <span>{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Vendedor: {product.vendor}</p>
          <p>Ubicacion: {product.location}</p>
          <p>Calificacion: {product.rating} / 5 ({product.reviews} reseñas)</p>
          <strong>{formatCurrency(product.price)}</strong>
          <button disabled={!product.inStock} onClick={addToCart} type="button">
            {product.inStock ? 'Agregar al carrito' : 'Producto agotado'}
          </button>
        </section>
      </main>
    </div>
  );
}
