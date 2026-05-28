import { useEffect, useRef, useState } from 'react';
import Header from '../components/shared/Header';
import Stack from '../helpers/Stack';
import { getOrderChatMessages, saveOrderChatMessages } from '../helpers/localOrders';
import { evaluateBotResponse, getBotResponseDelay } from '../services/chatService';
import styles from './ChatPage.module.scss';

function findInitialOrder(orders, orderId) {
  return orders.find((order) => String(order.id) === String(orderId)) || orders[0];
}

function buildInitialMessages(order, vendor) {
  const savedMessages = getOrderChatMessages(order.id);
  return savedMessages.length
    ? savedMessages
    : [
        {
          id: 1,
          sender: vendor,
          text: `Hola, soy el vendedor de tu orden ${order.id}. Ya recibimos tu pago.`,
        },
        {
          id: 2,
          sender: 'Sistema',
          text: `Este chat pertenece exclusivamente al pedido ${order.id}.`,
        },
      ];
}

function OrderChat({ paidOrder }) {
  const firstItem = paidOrder.items?.[0];
  const vendor = paidOrder.vendor || firstItem?.vendor || 'Vendedor MercadoLocal';
  const [messages, setMessages] = useState(() => buildInitialMessages(paidOrder, vendor));
  const [text, setText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const botTimerRef = useRef(null);
  const history = new Stack();
  messages.forEach((message) => history.push(message));

  useEffect(() => () => window.clearTimeout(botTimerRef.current), []);

  useEffect(() => {
    saveOrderChatMessages(paidOrder.id, messages);
  }, [messages, paidOrder.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userMessage = text.trim();
    if (!userMessage) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: 'Cliente', text: userMessage },
    ]);
    setText('');
    setIsBotTyping(true);

    window.clearTimeout(botTimerRef.current);
    botTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          sender: 'Asistente MercadoLocal',
          text: evaluateBotResponse(userMessage),
        },
      ]);
      setIsBotTyping(false);
    }, getBotResponseDelay());
  };

  return (
    <>
      <section className={styles.panel}>
        <div className={styles.heading}>
          <span>Pedido seleccionado</span>
          <h1>Hablar con {vendor}</h1>
          <p>Pedido {paidOrder.id} - Pago aprobado - Chat individual del pedido.</p>
        </div>

        <div className={styles.orderBox}>
          {firstItem?.image && <img src={firstItem.image} alt={firstItem.name} />}
          <div>
            <strong>{firstItem?.name || paidOrder.firstProduct}</strong>
            <span>Total orden: ${paidOrder.total?.toLocaleString('es-CO')}</span>
          </div>
        </div>

        <div className={styles.messages}>
          {messages.map((message) => (
            <article
              className={message.sender === 'Cliente' ? styles.own : styles.message}
              key={message.id}
            >
              <strong>{message.sender}</strong>
              <p>{message.text}</p>
            </article>
          ))}
          {isBotTyping && (
            <article className={styles.message}>
              <strong>Asistente MercadoLocal</strong>
              <p>Escribiendo...</p>
            </article>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => setText(event.target.value)}
            placeholder="Escribe al vendedor sobre tu compra..."
            value={text}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
      <aside className={styles.side}>
        <h2>Regla del chat</h2>
        <p>Este historial esta guardado y separado para el pedido {paidOrder.id}.</p>
        <h2>Pila de historial</h2>
        <p>Ultimo mensaje: {history.peek()?.text || 'Sin mensajes'}</p>
        <span>{history.size()} mensajes apilados en LIFO.</span>
      </aside>
    </>
  );
}

export default function ChatPage({ initialOrderId, paidOrders }) {
  const [selectedOrderId, setSelectedOrderId] = useState(
    findInitialOrder(paidOrders, initialOrderId).id
  );
  const paidOrder =
    paidOrders.find((order) => String(order.id) === String(selectedOrderId)) || paidOrders[0];

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.chatShell}>
        <section className={styles.panel}>
          <div className={styles.heading}>
            <span>Chat post-compra</span>
            <h1>Chats por pedido</h1>
            <p>Selecciona una compra para ver su conversacion individual.</p>
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
        </section>
        <main className={styles.chat}>
          <OrderChat key={paidOrder.id} paidOrder={paidOrder} />
        </main>
      </div>
    </div>
  );
}
