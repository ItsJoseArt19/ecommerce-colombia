// Servicio de pagos con Stripe
// Documentación: https://stripe.com/docs/stripe-js

export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Crear token de pago
export const createPaymentToken = async (cardDetails) => {
  try {
    // En producción, usar stripe.js para crear el token de forma segura
    // Aquí es solo un ejemplo de estructura
    const token = {
      type: 'card',
      card: {
        number: cardDetails.number.replace(/\s/g, ''),
        exp_month: cardDetails.expiry.split('/')[0],
        exp_year: cardDetails.expiry.split('/')[1],
        cvc: cardDetails.cvc,
      },
    };
    return token;
  } catch (error) {
    throw error;
  }
};

// Procesar pago
export const processPayment = async (amount, token, orderId) => {
  try {
    // Validamos numeros de tarjeta de entorno de pruebas.
    const testCards = {
      success: '4242424242424242', // Pago exitoso
      decline: '4000000000000002', // Pago rechazado
    };

    const cardNumber = token.card.number;

    const response = {
      id: `pi_${Date.now()}`,
      amount,
      orderId,
      status: cardNumber === testCards.success ? 'succeeded' : 'failed',
      created: new Date(),
      charge: {
        id: `ch_${Date.now()}`,
        amount,
        currency: 'usd',
        description: `Order ${orderId}`,
      },
    };

    return response;
  } catch (error) {
    throw error;
  }
};

// Obtener historial de pagos del usuario
export const getUserPaymentHistory = async () => {
  // TODO: Implementar obtención de Firestore
  return [];
};

// Validar tarjeta (Luhn algorithm)
export const validateCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Validar CVC
export const validateCVC = (cvc) => {
  return /^\d{3,4}$/.test(cvc);
};

// Validar fecha de expiración
export const validateExpiryDate = (expiryDate) => {
  const [month, year] = expiryDate.split('/');
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  const expYear = parseInt(year, 10);
  const expMonth = parseInt(month, 10);

  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;

  return expMonth >= 1 && expMonth <= 12;
};
