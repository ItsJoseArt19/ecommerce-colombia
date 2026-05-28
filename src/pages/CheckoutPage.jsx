import { useMemo, useState } from 'react';
import Header from '../components/shared/Header';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { buildOrderQueue } from '../helpers/commerceStructures';
import { saveStoredOrder } from '../helpers/localOrders';
import { createOrder } from '../services/cartService';
import {
  createPaymentToken,
  processPayment,
  validateCardNumber,
  validateCVC,
  validateExpiryDate,
} from '../services/paymentService';
import styles from './CheckoutPage.module.scss';

const formatCurrency = (value) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const onlyDigits = (value) => value.replace(/\D/g, '');

const formatCardNumber = (value) =>
  onlyDigits(value)
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiryDate = (value) => {
  const digits = onlyDigits(value).slice(0, 4);
  if (!digits) return '';

  let month = digits.slice(0, 2);
  const year = digits.slice(2);

  if (digits.length === 1 && Number(digits) > 1) {
    month = `0${digits}`;
    return `${month}/`;
  }

  if (digits.length >= 2) {
    const monthNumber = Number(month);
    if (monthNumber === 0) month = '01';
    if (monthNumber > 12) month = '12';
  }

  return year ? `${month}/${year}` : month;
};

const createOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 4)
      : Math.random().toString(36).slice(2, 6);

  return `ML-${timestamp}-${random.toUpperCase()}`;
};

export default function CheckoutPage() {
  const { dispatch, items, total } = useCart();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Bogota');
  const [paymentError, setPaymentError] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });
  const [documentNumber, setDocumentNumber] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const queue = useMemo(() => buildOrderQueue(items), [items]);
  const shipping = total >= 120000 || total === 0 ? 0 : 12000;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentError('');

    if (!emailPattern.test(email.trim())) {
      setPaymentError('Ingresa un correo valido con @ y dominio.');
      return;
    }

    if (documentNumber.trim().length < 6) {
      setPaymentError('Ingresa un numero de identificacion valido.');
      return;
    }

    if (!validateCardNumber(cardDetails.number)) {
      setPaymentError('Numero de tarjeta invalido.');
      return;
    }

    if (!validateExpiryDate(cardDetails.expiry)) {
      setPaymentError('Fecha de expiracion invalida.');
      return;
    }

    if (!validateCVC(cardDetails.cvc)) {
      setPaymentError('Codigo CVC invalido.');
      return;
    }

    const nextOrder = queue.front();
    const generatedId = createOrderId();
    const orderItems = items.map((item) => ({
      id: item.id,
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      vendor: item.vendor || 'Vendedor MercadoLocal',
    }));
    const order = {
      id: generatedId,
      firstProduct: nextOrder?.name,
      vendor: nextOrder?.vendor || 'Vendedor MercadoLocal',
      deliveryCity,
      items: orderItems,
      paymentStatus: 'paid',
      chatEnabled: true,
      status: 'processing',
      total: total + shipping,
      userId: user?.uid || null,
      customerEmail: email.trim(),
      documentNumber,
      createdAt: new Date().toISOString(),
    };

    const token = await createPaymentToken(cardDetails);
    const payment = await processPayment(order.total, token, generatedId);
    if (payment.status !== 'succeeded') {
      setPaymentError('El pago fue rechazado. Verifica los datos de la tarjeta.');
      return;
    }

    saveStoredOrder(order);

    try {
      await createOrder(user.uid, orderItems, order.total, { city: deliveryCity });
    } catch (error) {
      console.warn('No se pudo guardar la orden en Firestore. Se conserva localmente.', error);
    }

    setOrderId(generatedId);
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
                <Link to={`/chat/${orderId}`}>Hablar con vendedor</Link>
                <Link to={`/entregas/${orderId}`}>Ver seguimiento</Link>
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
                <input
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  required
                  title="Ingresa un correo valido, por ejemplo usuario@correo.com"
                  type="email"
                  value={email}
                />
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
                  Numero de identificacion
                  <input
                    autoComplete="off"
                    inputMode="numeric"
                    maxLength={12}
                    minLength={6}
                    onChange={(event) =>
                      setDocumentNumber(onlyDigits(event.target.value).slice(0, 12))
                    }
                    placeholder="CC / NIT"
                    required
                    value={documentNumber}
                  />
                </label>
              </div>
              <div className={styles.grid}>
                <label>
                  Numero de tarjeta
                  <input
                    autoComplete="cc-number"
                    inputMode="numeric"
                    onChange={(event) =>
                      setCardDetails((current) => ({
                        ...current,
                        number: formatCardNumber(event.target.value),
                      }))
                    }
                    placeholder="4242 4242 4242 4242"
                    required
                    title="Ingresa 16 digitos. Se separan automaticamente cada 4 numeros."
                    value={cardDetails.number}
                  />
                </label>
                <label>
                  Expiracion
                  <input
                    autoComplete="cc-exp"
                    inputMode="numeric"
                    maxLength={5}
                    onChange={(event) =>
                      setCardDetails((current) => ({
                        ...current,
                        expiry: formatExpiryDate(event.target.value),
                      }))
                    }
                    placeholder="12/30"
                    required
                    title="Formato MM/AA. Si escribes 4, se convierte en 04/."
                    value={cardDetails.expiry}
                  />
                </label>
              </div>
              <label>
                CVC
                <input
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  onChange={(event) =>
                    setCardDetails((current) => ({
                      ...current,
                      cvc: onlyDigits(event.target.value).slice(0, 4),
                    }))
                  }
                  placeholder="123"
                  required
                  title="Ingresa 3 o 4 digitos."
                  value={cardDetails.cvc}
                />
              </label>
              {paymentError && <p className={styles.error}>{paymentError}</p>}
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
