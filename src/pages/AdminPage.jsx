import Header from '../components/shared/Header';
import { DUMMY_PRODUCTS } from '../data/dummyData';
import { getStoredOrders } from '../helpers/localOrders';
import styles from './SimplePage.module.scss';

export default function AdminPage() {
  const orders = getStoredOrders();
  const stock = DUMMY_PRODUCTS.filter((product) => product.inStock).length;
  const totalSales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const topProduct = orders[0]?.firstProduct || 'Sin ventas';

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.panel}>
        <span>Panel privado</span>
        <h1>Administracion</h1>
        <p>Productos publicados: {DUMMY_PRODUCTS.length}</p>
        <p>Productos disponibles: {stock}</p>
        <p>Ordenes registradas: {orders.length}</p>
        <p>Ventas totales: {totalSales.toLocaleString('es-CO')}</p>
        <p>Producto reciente: {topProduct}</p>
      </main>
    </div>
  );
}
