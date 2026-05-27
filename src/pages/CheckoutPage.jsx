import { useMemo, useState } from 'react';
import Header from '../components/shared/Header';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { buildOrderQueue } from '../helpers/commerceStructures';
import styles from './CheckoutPage.module.scss';

const formatCurrency = (value) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export default function CheckoutPage() {
  const { dispatch, items, total } = useCart();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Bogota');
  const queue = useMemo(() => buildOrderQueue(items), [items]);
  const shipping = total >= 120000 || total === 0 ? 0 : 12000;

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextOrder = queue.front();
    const generatedId = `ML-${Date.now().toString().slice(-6)}`;
    const orderItems = items.map((item) => ({
      id: item.id,
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      vendor: item.vendor || 'Vendedor MercadoLocal',
    }));
    setOrderId(generatedId);
    localStorage.setItem(
      'lastOrder',
      JSON.stringify({
        id: generatedId,
        firstProduct: nextOrder?.name,
        vendor: nextOrder?.vendor || 'Vendedor MercadoLocal',
        deliveryCity,
        items: orderItems,
        paymentStatus: 'paid',
        chatEnabled: true,
        total: total + shipping,
        createdAt: new Date().toISOString(),
      })
    );
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.layout}>
        <section className={styles.formPanel}>
          <span>Pago seguro</span>
          <h1>Finalizar compra</h1>
          <p className={styles.notice}>
            Compra protegida: solo usuarios autenticados pueden confirmar ordenes.
          </p>

          {orderId ? (
            <div className={styles.success}>
              <h2>Pago aprobado: {orderId}</h2>
              <p>Ahora puedes hablar con el vendedor sobre esta compra.</p>
              <div className={styles.successActions}>
                <Link to="/chat">Hablar con vendedor</Link>
                <Link to="/entregas">Ver seguimiento</Link>
                <Link to="/">Volver al catalogo</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Nombre completo
                <input defaultValue={user?.displayName || ''} required />
              </label>
              <label>
                Correo
                <input defaultValue={user?.email || ''} required type="email" />
              </label>
              <label>
                Direccion de entrega
                <input required placeholder="Calle, ciudad, barrio" />
              </label>
              <div className={styles.grid}>
                <label>
                  Ciudad de entrega
                  <select
                    onChange={(event) => setDeliveryCity(event.target.value)}
                    required
                    value={deliveryCity}
                  >
                    <option value="Bogota">Bogota</option>
                    <option value="Medellin">Medellin</option>
                    <option value="Cali">Cali</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                    <option value="Cartagena">Cartagena</option>
                  </select>
                </label>
                <label>
                  Metodo de pago
                  <select required>
                    <option>Tarjeta</option>
                    <option>Pago contra entrega</option>
                  </select>
                </label>
              </div>
              <div className={styles.grid}>
                <label>
                  Documento
                  <input required placeholder="CC / NIT" />
                </label>
              </div>
              <button type="submit">
                Confirmar orden
              </button>
            </form>
          )}
        </section>

        <aside className={styles.summary}>
          <h2>Resumen de orden</h2>
          <div className={styles.lines}>
            {items.map((item) => (
              <div key={item.id}>
                <span>{item.name} x{item.quantity}</span>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <strong>{formatCurrency(total + shipping)}</strong>
          </div>
          <p>La cola FIFO define el orden de alistamiento de productos.</p>
        </aside>
      </main>
    </div>
  );
}
