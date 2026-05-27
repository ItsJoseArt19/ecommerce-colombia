import { useState } from 'react';
import Header from '../components/shared/Header';
import Stack from '../helpers/Stack';
import styles from './ChatPage.module.scss';

export default function ChatPage({ paidOrder }) {
  const firstItem = paidOrder.items?.[0];
  const vendor = paidOrder.vendor || firstItem?.vendor || 'Vendedor MercadoLocal';
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: vendor,
      text: `Hola, soy el vendedor de tu orden ${paidOrder.id}. Ya recibimos tu pago.`,
    },
    {
      id: 2,
      sender: 'Sistema',
      text: 'Este chat se habilito porque existe una compra pagada.',
    },
  ]);
  const [text, setText] = useState('');
  const history = new Stack();
  messages.forEach((message) => history.push(message));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: 'Cliente', text: text.trim() },
      {
        id: Date.now() + 1,
        sender: vendor,
        text: 'Mensaje recibido. Te responderemos con detalles de envio y estado del producto.',
      },
    ]);
    setText('');
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.chat}>
        <section className={styles.panel}>
          <div className={styles.heading}>
            <span>Chat post-compra</span>
            <h1>Hablar con {vendor}</h1>
            <p>Orden {paidOrder.id} · Pago aprobado · Chat habilitado.</p>
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
          <p>Solo se habilita despues de una orden con pago aprobado.</p>
          <h2>Pila de historial</h2>
          <p>Ultimo mensaje: {history.peek()?.text || 'Sin mensajes'}</p>
          <span>{history.size()} mensajes apilados en LIFO.</span>
        </aside>
      </main>
    </div>
  );
}
