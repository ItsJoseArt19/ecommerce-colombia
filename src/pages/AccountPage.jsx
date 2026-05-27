import Header from '../components/shared/Header';
import { useAuth } from '../hooks/useAuth';
import styles from './SimplePage.module.scss';

export default function AccountPage() {
  const { user, userRole } = useAuth();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.panel}>
        <span>Zona privada</span>
        <h1>Mi cuenta</h1>
        <p>Usuario: {user?.displayName || user?.email || 'Cliente'}</p>
        <p>Rol registrado: {userRole || 'user'}</p>
      </main>
    </div>
  );
}
