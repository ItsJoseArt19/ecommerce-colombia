import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginUser } from '../services/authService';
import styles from './AuthPages.module.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email y contraseña son requeridos');
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser(formData.email, formData.password);

      // Actualizar AuthContext
      dispatch({
        type: 'SET_USER',
        payload: user,
      });

      // Guardar preferencia si lo desea
      if (formData.rememberMe) {
        localStorage.setItem('mercadolocal_email', formData.email);
      }

      // Redirigir a home
      navigate('/');
    } catch (err) {
      setError(
        err.code === 'auth/user-not-found'
          ? 'Usuario no encontrado'
          : err.code === 'auth/wrong-password'
          ? 'Contraseña incorrecta'
          : err.message || 'Error al iniciar sesión'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h1>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Bienvenido a MercadoLocal</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              disabled={loading}
              required
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="rememberMe">
              Recuérdame
            </label>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className={styles.link}>
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
        
        <p className={styles.link}>
          <Link to="/">¿Olvidaste tu contraseña?</Link>
        </p>
      </div>
    </div>
  );
}
