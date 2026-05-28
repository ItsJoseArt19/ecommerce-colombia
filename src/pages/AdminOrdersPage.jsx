import Header from '../components/shared/Header';
import { getStoredOrders } from '../helpers/localOrders';
import styles from './SimplePage.module.scss';

export default function AdminOrdersPage() {
  const orders = getStoredOrders();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.panel}>
        <span>Gestion</span>
        <h1>Ordenes</h1>
        <div className={styles.list}>
          {orders.length === 0 ? (
            <article>
              <strong>Sin ordenes</strong>
              <p>Cuando se confirme una compra aparecera aqui.</p>
            </article>
          ) : (
            orders.map((order) => (
              <article key={order.id}>
                <strong>{order.id}</strong>
                <p>{order.firstProduct}</p>
                <p>Destino: {order.deliveryCity}</p>
                <p>Total: {Number(order.total || 0).toLocaleString('es-CO')}</p>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
