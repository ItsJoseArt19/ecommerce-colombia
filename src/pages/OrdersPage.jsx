import Header from '../components/shared/Header';
import { Link } from 'react-router-dom';
import { getStoredOrders } from '../helpers/localOrders';
import styles from './SimplePage.module.scss';

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

export default function OrdersPage() {
  const orders = getStoredOrders();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.panel}>
        <span>Historial</span>
        <h1>Mis ordenes</h1>
        {orders.length === 0 ? (
          <>
            <p>Todavia no tienes ordenes registradas.</p>
            <Link to="/">Explorar productos</Link>
          </>
        ) : (
          <div className={styles.list}>
            {orders.map((order) => (
              <article key={order.id}>
                <strong>{order.id}</strong>
                <p>{order.firstProduct}</p>
                <p>Destino: {order.deliveryCity}</p>
                <p>Estado: {order.status}</p>
                <p>Total: {formatCurrency(order.total)}</p>
                <Link to={`/entregas/${order.id}`}>Ver seguimiento</Link>
                <Link to={`/chat/${order.id}`}>Chat del pedido</Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
