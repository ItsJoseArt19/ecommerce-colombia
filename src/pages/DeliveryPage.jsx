import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/shared/Header';
import { buildDeliveryGraph } from '../helpers/commerceStructures';
import {
  getOrderTrackingProgress,
  saveOrderTrackingProgress,
} from '../helpers/localOrders';
import {
  geocodeAddress,
  getBogotaCoordinates,
  getCoordinatesByCity,
  getRouteCoordinates,
} from '../services/mapService';
import styles from './DeliveryPage.module.scss';

const COLOMBIA_CENTER = [4.5709, -74.2973];
const ORIGIN = getBogotaCoordinates();
const SIMULATED_DELIVERY_DAYS = 7;
const SUPPORT_QUESTIONS = [
  'Desea mas informacion sobre su envio?',
  'Quiere cambiar la direccion de entrega?',
  'Desea contactar al vendedor por este pedido?',
  'Quiere recibir una notificacion cuando cambie el estado?',
];

const vehicleIcon = new L.DivIcon({
  className: styles.vehicleIcon,
  html: '<span>*</span>',
  iconAnchor: [10, 10],
});

function FitRouteBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route.length > 1) {
      map.fitBounds(route, { padding: [40, 40] });
    }
  }, [map, route]);

  return null;
}

function getFallbackRoute(destination) {
  return [ORIGIN, destination];
}

function findInitialOrder(orders, orderId) {
  return orders.find((order) => String(order.id) === String(orderId)) || orders[0];
}

export default function DeliveryPage({ initialOrderId, paidOrders }) {
  const [selectedOrderId, setSelectedOrderId] = useState(
    findInitialOrder(paidOrders, initialOrderId).id
  );
  const paidOrder =
    paidOrders.find((order) => String(order.id) === String(selectedOrderId)) || paidOrders[0];
  const graph = useMemo(() => buildDeliveryGraph(), []);
  const destinationCity = paidOrder.deliveryCity || 'Bogota';
  const destinationLabel = `${destinationCity}, Colombia`;
  const firstItem = paidOrder.items?.[0];
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeOrderId, setRouteOrderId] = useState(paidOrder.id);
  const savedProgress = useMemo(() => getOrderTrackingProgress(paidOrder.id), [paidOrder.id]);
  const [markerIndex, setMarkerIndex] = useState(savedProgress.markerIndex || 0);
  const [simulatedDay, setSimulatedDay] = useState(savedProgress.simulatedDay || 1);
  const [status, setStatus] = useState('Calculando ruta del pedido...');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Soporte',
      text: `Estamos preparando el seguimiento del pedido ${paidOrder.id}.`,
    },
  ]);

  const destinationCoordinates = useMemo(
    () => getCoordinatesByCity(destinationCity),
    [destinationCity]
  );
  const graphRoute = useMemo(() => graph.bfs('Bogota'), [graph]);
  const markerPosition = routeCoordinates[markerIndex] || ORIGIN;
  const progress = routeCoordinates.length
    ? Math.round(((markerIndex + 1) / routeCoordinates.length) * 100)
    : 0;

  useEffect(() => {
    let isMounted = true;

    const loadRoute = async () => {
      setStatus('Buscando direccion de entrega...');
      setRouteCoordinates([]);
      setRouteOrderId(paidOrder.id);
      try {
        let destination = destinationCoordinates;
        try {
          destination = await geocodeAddress(destinationLabel);
        } catch {
          destination = destinationCoordinates;
        }

        const route = await getRouteCoordinates(ORIGIN, destination);
        if (isMounted) {
          const progress = getOrderTrackingProgress(paidOrder.id);
          setRouteOrderId(paidOrder.id);
          setRouteCoordinates(route);
          setMarkerIndex(Math.min(progress.markerIndex || 0, route.length - 1));
          setSimulatedDay(progress.simulatedDay || 1);
          setStatus('Pedido en ruta');
        }
      } catch (error) {
        if (isMounted) {
          console.warn(error);
          const fallbackRoute = getFallbackRoute(destinationCoordinates);
          const progress = getOrderTrackingProgress(paidOrder.id);
          setRouteOrderId(paidOrder.id);
          setRouteCoordinates(fallbackRoute);
          setMarkerIndex(Math.min(progress.markerIndex || 0, fallbackRoute.length - 1));
          setSimulatedDay(progress.simulatedDay || 1);
          setStatus('Ruta estimada disponible');
        }
      }
    };

    loadRoute();

    return () => {
      isMounted = false;
    };
  }, [destinationCoordinates, destinationLabel, paidOrder.id]);

  useEffect(() => {
    if (routeCoordinates.length <= 1 || String(routeOrderId) !== String(paidOrder.id)) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setMarkerIndex((current) => {
        const next = current >= routeCoordinates.length - 1 ? current : current + 1;
        const day = Math.min(
          SIMULATED_DELIVERY_DAYS,
          Math.max(1, Math.ceil(((next + 1) / routeCoordinates.length) * SIMULATED_DELIVERY_DAYS))
        );
        setSimulatedDay(day);
        saveOrderTrackingProgress(paidOrder.id, {
          markerIndex: next,
          simulatedDay: day,
          completed: next >= routeCoordinates.length - 1,
        });
        return next;
      });
    }, 700);

    return () => window.clearInterval(interval);
  }, [paidOrder.id, routeCoordinates, routeOrderId]);

  useEffect(() => {
    if (!routeCoordinates.length) return undefined;

    const interval = window.setInterval(() => {
      setMessages((current) => [
        ...current.slice(-5),
        {
          id: Date.now(),
          sender: 'Soporte',
          text: SUPPORT_QUESTIONS[Math.floor(Math.random() * SUPPORT_QUESTIONS.length)],
        },
      ]);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [routeCoordinates.length]);

  const handleChatSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = formData.get('message')?.toString().trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: 'Cliente', text },
      {
        id: Date.now() + 1,
        sender: 'Soporte',
        text: SUPPORT_QUESTIONS[Math.floor(Math.random() * SUPPORT_QUESTIONS.length)],
      },
    ]);
    event.currentTarget.reset();
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.layout}>
        <section className={styles.trackingPanel}>
          <div className={styles.header}>
            <span>Seguimiento</span>
            <h1>Seguimiento de compras</h1>
            <p>
              Selecciona un pedido para desplegar su informacion, mapa y avance individual.
            </p>
          </div>

          <section className={styles.orderSelector}>
            {paidOrders.map((order) => (
              <button
                className={order.id === paidOrder.id ? styles.selectedOrder : styles.orderButton}
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                type="button"
              >
                <span>{order.id}</span>
                <strong>{order.firstProduct || order.items?.[0]?.name}</strong>
                <small>{order.deliveryCity || 'Bogota'}</small>
              </button>
            ))}
          </section>

          <div className={styles.header}>
            <span>Pedido seleccionado</span>
            <h1>Pedido {paidOrder.id}</h1>
            <p>
              Ruta desde Bogota hasta {destinationCity}. La entrega estimada es de 5 a 10
              dias; el recorrido se acelera visualmente para mostrar el avance.
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
              <strong>{status}</strong>
            </article>
            <article>
              <span>Dia simulado</span>
              <strong>
                Dia {simulatedDay} de {SIMULATED_DELIVERY_DAYS}
              </strong>
            </article>
            <article>
              <span>Avance</span>
              <strong>{progress}%</strong>
            </article>
          </div>

          <div className={styles.mapCard}>
            <MapContainer center={COLOMBIA_CENTER} zoom={6} className={styles.map}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {routeCoordinates.length > 0 && (
                <>
                  <FitRouteBounds route={routeCoordinates} />
                  <Polyline positions={routeCoordinates} pathOptions={{ color: '#1f7a4d', weight: 5 }} />
                  <Marker position={ORIGIN}>
                    <Popup>Origen: Bogota</Popup>
                  </Marker>
                  <Marker position={destinationCoordinates}>
                    <Popup>Destino: {destinationCity}</Popup>
                  </Marker>
                  <Marker icon={vehicleIcon} position={markerPosition}>
                    <Popup>Vehiculo en ruta - dia {simulatedDay}</Popup>
                  </Marker>
                </>
              )}
            </MapContainer>
          </div>
        </section>

        <aside className={styles.side}>
          <h2>Grafo aplicado</h2>
          <p>
            Las ciudades funcionan como nodos conectados. Para la visualizacion se consulta
            OSRM y se dibuja la ruta real sobre OpenStreetMap.
          </p>
          <div className={styles.route}>
            {graphRoute.map((city, index) => (
              <div
                className={city === destinationCity ? styles.currentNode : styles.node}
                key={city}
              >
                <span>{index + 1}</span>
                <strong>{city}</strong>
              </div>
            ))}
          </div>

          <section className={styles.chatBox}>
            <h2>Chat de soporte pedido {paidOrder.id}</h2>
            <div className={styles.messages}>
              {messages.map((message) => (
                <article
                  className={message.sender === 'Cliente' ? styles.ownMessage : styles.message}
                  key={message.id}
                >
                  <strong>{message.sender}</strong>
                  <p>{message.text}</p>
                </article>
              ))}
            </div>
            <form onSubmit={handleChatSubmit}>
              <input name="message" placeholder="Escribe una pregunta..." />
              <button type="submit">Enviar</button>
            </form>
          </section>
        </aside>
      </main>
    </div>
  );
}
