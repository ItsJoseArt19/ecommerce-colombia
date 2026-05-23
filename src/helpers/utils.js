// Formatear precio a moneda
export const formatPrice = (price, currency = 'COP') => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
};

// Formatear fecha
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-CO').format(new Date(date));
};

// Validar email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Truncar texto
export const truncateText = (text, maxLength = 100) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Generar ID único
export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Obtener iniciales del nombre
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Clasificar calificación
export const getRatingLabel = (rating) => {
  if (rating >= 4.5) return 'Excelente';
  if (rating >= 3.5) return 'Muy Bueno';
  if (rating >= 2.5) return 'Bueno';
  if (rating >= 1.5) return 'Regular';
  return 'Pobre';
};
