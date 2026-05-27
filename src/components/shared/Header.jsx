import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.scss';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { itemCount } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchValue.trim();
    if (query) {
      navigate(`/#catalogo?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.announcement}>
        Envio gratis desde $120.000 · Pagos seguros · Productores colombianos
      </div>

      <div className={styles.mainBar}>
        <Link to="/" className={styles.logo}>
          <span>ML</span>
          <strong>MercadoLocal</strong>
        </Link>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="search"
            placeholder="Buscar productos, marcas o vendedores"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <Link className={styles.account} to="/mi-cuenta">
                Hola, {user?.displayName || 'Usuario'}
              </Link>
              <button className={styles.ghostBtn} onClick={logout} type="button">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link className={styles.account} to="/login">Ingresar</Link>
              <Link className={styles.primaryBtn} to="/registro">Registro</Link>
            </>
          )}
          <Link to="/carrito" className={styles.cart}>
            Carrito
            {itemCount > 0 && <span>{itemCount}</span>}
          </Link>
          <button
            aria-label="Abrir menu"
            className={styles.menuButton}
            onClick={() => setShowMobileMenu((current) => !current)}
            type="button"
          >
            Menu
          </button>
        </div>
      </div>

      <nav className={`${styles.nav} ${showMobileMenu ? styles.navOpen : ''}`}>
        <a href="/#catalogo">Catalogo</a>
        <a href="/#categorias">Categorias</a>
        <Link to="/entregas">Seguimiento</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}
