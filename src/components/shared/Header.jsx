import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.scss';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Buscar:', searchValue);
      // Aquí iría la lógica de búsqueda
    }
  };

  return (
    <header className={styles.header}>
      {/* Primera fila: Logo, ubicación y opciones */}
      <div className={styles.topBar}>
        <div className={styles.topContainer}>
          {/* Logo y Ubicación */}
          <Link to="/" className={styles.logo}>
            <h1>🛍️ MercadoLocal</h1>
          </Link>

          <div className={styles.topOptions}>
            <div className={styles.option}>
              <span className={styles.icon}>📍</span>
              <div>
                <small>Envíos a</small>
                <strong>Tu ubicación</strong>
              </div>
            </div>
            <div className={`${styles.option} ${styles.optionShipping}`}>
              <span className={styles.icon}>🚚</span>
              <strong>ENVÍO GRATIS</strong>
            </div>
          </div>

          {/* Auth rápido */}
          {!isAuthenticated && (
            <div className={styles.authQuick}>
              <Link to="/login">Ingresa</Link>
              <Link to="/registro" className={styles.registerBtn}>
                Regístrate
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Segunda fila: Búsqueda */}
      <div className={styles.searchBar}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>
            🔍
          </button>
        </form>
      </div>

      {/* Tercera fila: Navegación y carrito */}
      <div className={styles.bottomBar}>
        <nav className={`${styles.nav} ${showMobileMenu ? styles.navActive : ''}`}>
          <Link to="/">Categorías</Link>
          <Link to="/">Ofertas</Link>
          <Link to="/">Marcas</Link>
          <Link to="/">Vendedores</Link>
          <Link to="/">Ayuda</Link>
        </nav>

        {/* Acciones derecha */}
        <div className={styles.actions}>
          {isAuthenticated && (
            <span className={styles.userName}>
              Hola, {user?.displayName || 'Usuario'}
            </span>
          )}

          <Link to="/carrito" className={styles.cartIcon}>
            🛒
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </Link>

          <button
            className={styles.hamburger}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
