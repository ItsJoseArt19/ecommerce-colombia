import Graph from '../helpers/Graph';

// Grafo de ciudades y puntos de entrega
const citiesGraph = new Graph(false);

// Datos de puntos de entrega de ejemplo
export const DELIVERY_POINTS = [
  {
    id: 1,
    name: 'Punto Centro - Bogotá',
    city: 'Bogotá',
    latitude: 4.7110,
    longitude: -74.0721,
    address: 'Carrera 7 No 100-50, Bogotá',
    hours: '8:00 AM - 6:00 PM',
    phone: '+57 1 234 5678',
  },
  {
    id: 2,
    name: 'Punto Norte - Bogotá',
    city: 'Bogotá',
    latitude: 4.8138,
    longitude: -74.0165,
    address: 'Calle 100 No 15-50, Bogotá',
    hours: '9:00 AM - 7:00 PM',
    phone: '+57 1 234 5679',
  },
  {
    id: 3,
    name: 'Punto Medellín',
    city: 'Medellín',
    latitude: 6.2442,
    longitude: -75.5812,
    address: 'Carrera 45 No 48-50, Medellín',
    hours: '8:00 AM - 6:00 PM',
    phone: '+57 4 234 5680',
  },
  {
    id: 4,
    name: 'Punto Cali',
    city: 'Cali',
    latitude: 3.4372,
    longitude: -76.5225,
    address: 'Carrera 5 No 20-50, Cali',
    hours: '9:00 AM - 5:00 PM',
    phone: '+57 2 234 5681',
  },
  {
    id: 5,
    name: 'Punto Cartagena',
    city: 'Cartagena',
    latitude: 10.3932,
    longitude: -75.4830,
    address: 'Calle 30 No 2-50, Cartagena',
    hours: '10:00 AM - 6:00 PM',
    phone: '+57 5 234 5682',
  },
];

// Inicializar grafo de ciudades
export const initializeCitiesGraph = () => {
  const cities = [...new Set(DELIVERY_POINTS.map(p => p.city))];

  // Agregar vértices
  cities.forEach(city => citiesGraph.addVertex(city));

  // Agregar aristas (conexiones entre ciudades)
  citiesGraph.addEdge('Bogotá', 'Medellín', 480); // km
  citiesGraph.addEdge('Bogotá', 'Cali', 520);
  citiesGraph.addEdge('Medellín', 'Cartagena', 600);
  citiesGraph.addEdge('Cali', 'Cartagena', 800);

  return citiesGraph;
};

// Obtener todos los puntos de entrega
export const getAllDeliveryPoints = () => {
  return DELIVERY_POINTS;
};

// Obtener puntos de entrega por ciudad
export const getDeliveryPointsByCity = (city) => {
  return DELIVERY_POINTS.filter(point => point.city === city);
};

// Obtener ciudades disponibles
export const getAvailableCities = () => {
  return [...new Set(DELIVERY_POINTS.map(p => p.city))];
};

// Calcular distancia entre dos coordenadas (Fórmula Haversine)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Encontrar punto de entrega más cercano
export const findNearestDeliveryPoint = (userLat, userLon) => {
  let nearest = null;
  let minDistance = Infinity;

  DELIVERY_POINTS.forEach(point => {
    const distance = calculateDistance(userLat, userLon, point.latitude, point.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = { ...point, distance: minDistance.toFixed(2) };
    }
  });

  return nearest;
};

// Obtener puntos de entrega en un área (radio en km)
export const getDeliveryPointsInArea = (lat, lon, radiusKm) => {
  return DELIVERY_POINTS.filter(point => {
    const distance = calculateDistance(lat, lon, point.latitude, point.longitude);
    return distance <= radiusKm;
  }).map(point => ({
    ...point,
    distance: calculateDistance(lat, lon, point.latitude, point.longitude).toFixed(2),
  }));
};

// Obtener ruta entre ciudades (usando el grafo)
export const getRouteBetweenCities = (fromCity, toCity) => {
  return citiesGraph.bfs(fromCity);
};
