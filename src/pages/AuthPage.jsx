import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './AuthPage.module.scss';

const errorMessages = {
  'auth/email-already-in-use': 'Este correo ya esta registrado.',
  'auth/invalid-email': 'Ingresa un correo valido.',
  'auth/invalid-credential': 'Correo o contrasena incorrectos.',
  'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres.',
  'auth/missing-password': 'Ingresa una contrasena.',
};

function getAuthErrorMessage(error) {
  return errorMessages[error?.code] || 'No se pudo completar la solicitud. Intenta de nuevo.';
}

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register';
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';
  const { isAuthenticated, loading, login, register } = useAuth();
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    try {
      if (isRegister) {
        await register(form.email.trim(), form.password, form.displayName.trim());
      } else {
        await login(form.email.trim(), form.password);
      }
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    }
  };

  return (
    <main className={styles.authPage}>
      <section className={styles.panel}>
        <Link to="/" className={styles.brand}>
          MercadoLocal
        </Link>

        <div className={styles.heading}>
          <h1>{isRegister ? 'Crear cuenta' : 'Ingresar'}</h1>
          <p>
            {isRegister
              ? 'Registra tu cuenta para comprar en la tienda.'
              : 'Accede con tu correo y contrasena.'}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Nombre
              <input
                autoComplete="name"
                name="displayName"
                onChange={handleChange}
                required
                type="text"
                value={form.displayName}
              />
            </label>
          )}

          <label>
            Correo
            <input
              autoComplete="email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={form.email}
            />
          </label>

          <label>
            Contrasena
            <input
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              minLength={6}
              name="password"
              onChange={handleChange}
              required
              type="password"
              value={form.password}
            />
          </label>

          {formError && <p className={styles.error}>{formError}</p>}

          <button disabled={loading} type="submit">
            {loading ? 'Procesando...' : isRegister ? 'Registrarme' : 'Ingresar'}
          </button>
        </form>

        <p className={styles.switch}>
          {isRegister ? 'Ya tienes cuenta?' : 'No tienes cuenta?'}
          <Link to={isRegister ? '/login' : '/registro'}>
            {isRegister ? ' Ingresa' : ' Registrate'}
          </Link>
        </p>
      </section>
    </main>
  );
}
