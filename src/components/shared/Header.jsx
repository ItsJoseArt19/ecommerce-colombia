import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import { logoutUser } from '../../services/authService';
import styles from './Header.module.scss';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { isAuthenticated, user, dispatch } = useAuth();
  const { filters, dispatch: dispatchProducts } = useProducts();

  // Cerrar menú cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      dispatchProducts({
        type: 'SET_FILTER',
        payload: { search: searchValue }
      });
      const productList = document.getElementById('product-list');
      if (productList) {
        productList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch({ type: 'SET_USER', payload: null });
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className={styles.header}>
      {/* Primera fila: Logo, ubicación y opciones */}
      <div className={styles.topBar}>
        <div className={styles.topContainer}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <h1>🛍️ MercadoLocal</h1>
          </Link>

          {/* Opciones a la derecha */}
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
          {/* Carrito */}
          <Link to="/carrito" className={styles.cartIcon}>
            🛒
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </Link>

          {/* Menú de Usuario */}
          {isAuthenticated ? (
            <div className={styles.userMenuContainer} ref={userMenuRef}>
              <button
                className={styles.userMenuBtn}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className={styles.userName}>
                  Hola, {user?.displayName?.split(' ')[0] || 'Usuario'}
                </span>
                <span className={styles.menuIcon}>▼</span>
              </button>

              {showUserMenu && (
                <div className={styles.userDropdown}>
                  <Link to="/" className={styles.menuItem}>
                    👤 Mi Perfil
                  </Link>
                  <Link to="/" className={styles.menuItem}>
                    🏪 Vender
                  </Link>
                  <Link to="/" className={styles.menuItem}>
                    ❤️ Mis Favoritos
                  </Link>
                  <Link to="/" className={styles.menuItem}>
                    📦 Mis Compras
                  </Link>
                  <hr className={styles.divider} />
                  <button
                    className={styles.logoutBtn}
                    onClick={handleLogout}
                  >
                    🚪 Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authQuickBottom}>
              <Link to="/login" className={styles.loginLink}>Ingresa</Link>
              <Link to="/registro" className={styles.registerLink}>Regístrate</Link>
            </div>
          )}

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
