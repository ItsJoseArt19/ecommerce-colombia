import Header from '../components/shared/Header';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { buildCartStack, buildOrderQueue } from '../helpers/commerceStructures';
import styles from './CartPage.module.scss';

const formatCurrency = (value) =>
  value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export default function CartPage() {
  const { dispatch, itemCount, items, total } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const needsPaidOrder = location.state?.reason === 'chat-requires-paid-order';
  const needsDeliveryOrder = location.state?.reason === 'delivery-requires-paid-order';
  const orderQueue = buildOrderQueue(items);
  const cartStack = buildCartStack(items);
  const lastAdded = cartStack.peek();
  const shipping = total >= 120000 || total === 0 ? 0 : 12000;
  const grandTotal = total + shipping;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.layout}>
        <section className={styles.content}>
          <div className={styles.titleRow}>
            <div>
              <span>Carrito de compras</span>
              <h1>{itemCount} productos seleccionados</h1>
            </div>
            <Link to="/">Seguir comprando</Link>
          </div>

          {(needsPaidOrder || needsDeliveryOrder) && (
            <div className={styles.warning}>
              Para {needsPaidOrder ? 'hablar con un vendedor' : 'ver el seguimiento'} primero
              debes iniciar sesion, comprar un producto y confirmar el pago.
            </div>
          )}

          {items.length === 0 ? (
            <div className={styles.empty}>
              <h2>Tu carrito esta vacio</h2>
              <p>Agrega productos del catalogo para iniciar tu compra.</p>
              <Link to="/">Explorar catalogo</Link>
            </div>
          ) : (
            <div className={styles.items}>
              {items.map((item) => (
                <article className={styles.item} key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h2>{item.name}</h2>
                    <p>{formatCurrency(item.price)}</p>
                    <div className={styles.quantity}>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          })
                        }
                        type="button"
                      >
                        -
                      </button>
                      <strong>{item.quantity}</strong>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                    type="button"
                  >
                    Quitar
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className={styles.summary}>
          <h2>Resumen</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
            <div>
              <dt>Envio</dt>
              <dd>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</dd>
            </div>
            <div className={styles.total}>
              <dt>Total</dt>
              <dd>{formatCurrency(grandTotal)}</dd>
            </div>
          </dl>

          <div className={styles.dataNote}>
            <strong>Cola de ordenes</strong>
            <span>{orderQueue.size()} productos listos para procesar en secuencia FIFO.</span>
          </div>
          {lastAdded && (
            <div className={styles.dataNote}>
              <strong>Ultimo agregado</strong>
              <span>{lastAdded.name}</span>
            </div>
          )}

          {items.length === 0 ? (
            <span className={styles.disabledCheckout}>Agrega productos para pagar</span>
          ) : (
            <Link className={styles.checkout} to={isAuthenticated ? '/checkout' : '/login'} state={{ from: '/checkout' }}>
              {isAuthenticated ? 'Continuar al pago' : 'Inicia sesion para pagar'}
            </Link>
          )}
        </aside>
      </main>
    </div>
  );
}
