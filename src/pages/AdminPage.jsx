import Header from '../components/shared/Header';
import { DUMMY_PRODUCTS } from '../data/dummyData';
import styles from './SimplePage.module.scss';

export default function AdminPage() {
  const stock = DUMMY_PRODUCTS.filter((product) => product.inStock).length;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.panel}>
        <span>Panel privado</span>
        <h1>Administracion</h1>
        <p>Productos publicados: {DUMMY_PRODUCTS.length}</p>
        <p>Productos disponibles: {stock}</p>
      </main>
    </div>
  );
}
