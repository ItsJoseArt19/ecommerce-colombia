import { Link } from 'react-router-dom';
import { DUMMY_PRODUCTS } from '../../data/dummyData';
import styles from './HeroBanner.module.scss';

export default function HeroBanner() {
  const featured = DUMMY_PRODUCTS[0];

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <span>Marketplace colombiano</span>
        <h1>Compra productos locales con entrega confiable y soporte directo.</h1>
        <p>
          Artesania, decoracion, moda, joyeria, tecnologia y hogar en una experiencia lista para
          carrito, login real, chat, rutas de entrega y administracion.
        </p>
        <div className={styles.actions}>
          <a href="#catalogo">Ver catalogo</a>
          <Link to="/entregas">Seguimiento de pedido</Link>
        </div>
      </div>

      <div className={styles.featured}>
        <img src={featured.image} alt={featured.name} />
        <div>
          <span>Producto destacado</span>
          <h2>{featured.name}</h2>
          <p>{featured.vendor} · {featured.location}</p>
        </div>
      </div>
    </section>
  );
}
