import Header from '../components/shared/Header';
import { DUMMY_PRODUCTS } from '../data/dummyData';
import styles from './SimplePage.module.scss';

export default function AdminProductsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.panel}>
        <span>Gestion</span>
        <h1>Productos</h1>
        <div className={styles.list}>
          {DUMMY_PRODUCTS.map((product) => (
            <article key={product.id}>
              <strong>{product.name}</strong>
              <p>Categoria: {product.category}</p>
              <p>Vendedor: {product.vendor}</p>
              <p>Estado: {product.inStock ? 'Disponible' : 'Agotado'}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
