import { useMemo } from 'react';
import Header from '../components/shared/Header';
import { buildDeliveryGraph } from '../helpers/commerceStructures';
import styles from './DeliveryPage.module.scss';

function getRouteToCity(graph, destination) {
  const start = 'Bogota';
  const queue = [start];
  const visited = { [start]: true };
  const previous = {};

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === destination) break;

    graph.getNeighbors(current).forEach((neighbor) => {
      if (!visited[neighbor.node]) {
        visited[neighbor.node] = true;
        previous[neighbor.node] = current;
        queue.push(neighbor.node);
      }
    });
  }

  if (!visited[destination]) return [start];

  const route = [];
  let current = destination;
  while (current) {
    route.unshift(current);
    current = previous[current];
  }
  return route;
}

export default function DeliveryPage({ paidOrder }) {
  const graph = useMemo(() => buildDeliveryGraph(), []);
  const destination = paidOrder.deliveryCity || 'Bogota';
  const route = getRouteToCity(graph, destination);
  const firstItem = paidOrder.items?.[0];
  const routeText = route.join(' -> ');

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.layout}>
        <section className={styles.trackingPanel}>
          <div className={styles.header}>
            <span>Entregas</span>
            <h1>Seguimiento del pedido {paidOrder.id}</h1>
            <p>
              El recorrido usa un grafo de ciudades para representar el avance logistico
              desde el centro de despacho hasta tu ciudad.
            </p>
          </div>

          <article className={styles.product}>
            {firstItem?.image && <img src={firstItem.image} alt={firstItem.name} />}
            <div>
              <span>Producto comprado</span>
              <h2>{firstItem?.name || paidOrder.firstProduct}</h2>
              <p>Vendedor: {paidOrder.vendor}</p>
            </div>
          </article>

          <div className={styles.statusGrid}>
            <article>
              <span>Estado</span>
              <strong>En ruta</strong>
            </article>
            <article>
              <span>Destino</span>
              <strong>{destination}</strong>
            </article>
            <article>
              <span>Total</span>
              <strong>${paidOrder.total?.toLocaleString('es-CO')}</strong>
            </article>
          </div>

          <section className={styles.timeline}>
            <h2>Linea de seguimiento</h2>
            <ol>
              <li className={styles.done}>
                <strong>Pago aprobado</strong>
                <span>La orden fue confirmada y enviada al vendedor.</span>
              </li>
              <li className={styles.done}>
                <strong>Producto preparado</strong>
                <span>{paidOrder.vendor} preparo el producto para despacho.</span>
              </li>
              <li className={styles.active}>
                <strong>En ruta por grafo logistico</strong>
                <span>{routeText}</span>
              </li>
              <li>
                <strong>Entrega final</strong>
                <span>Entrega pendiente en {destination}.</span>
              </li>
            </ol>
          </section>
        </section>

        <aside className={styles.side}>
          <h2>Grafo aplicado</h2>
          <p>
            Cada ciudad es un nodo y cada conexion representa una ruta disponible para mover
            el pedido.
          </p>
          <div className={styles.route}>
            {route.map((city, index) => (
              <div className={index === route.length - 1 ? styles.currentNode : styles.node} key={city}>
                <span>{index + 1}</span>
                <strong>{city}</strong>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
