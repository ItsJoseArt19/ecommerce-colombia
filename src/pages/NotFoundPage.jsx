import Header from '../components/shared/Header';
import { Link } from 'react-router-dom';
import styles from './SimplePage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.panel}>
        <span>404</span>
        <h1>Pagina no encontrada</h1>
        <p>La ruta solicitada no existe en MercadoLocal.</p>
        <Link to="/">Volver al inicio</Link>
      </main>
    </div>
  );
}
