import Graph from '../helpers/Graph';

const citiesGraph = new Graph(false);
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';
const DEFAULT_BOGOTA_COORDINATES = [4.711, -74.0721];

export const DELIVERY_POINTS = [
  {
    id: 1,
    name: 'Punto Centro - Bogota',
    city: 'Bogota',
    latitude: 4.711,
    longitude: -74.0721,
    x: 58,
    y: 45,
    address: 'Carrera 7 No 100-50, Bogota',
    hours: '8:00 AM - 6:00 PM',
    phone: '+57 1 234 5678',
  },
  {
    id: 2,
    name: 'Punto Medellin',
    city: 'Medellin',
    latitude: 6.2442,
    longitude: -75.5812,
    x: 42,
    y: 34,
    address: 'Carrera 45 No 48-50, Medellin',
    hours: '8:00 AM - 6:00 PM',
    phone: '+57 4 234 5680',
  },
  {
    id: 3,
    name: 'Punto Cali',
    city: 'Cali',
    latitude: 3.4372,
    longitude: -76.5225,
    x: 33,
    y: 58,
    address: 'Carrera 5 No 20-50, Cali',
    hours: '9:00 AM - 5:00 PM',
    phone: '+57 2 234 5681',
  },
  {
    id: 4,
    name: 'Punto Cartagena',
    city: 'Cartagena',
    latitude: 10.3932,
    longitude: -75.483,
    x: 45,
    y: 12,
    address: 'Calle 30 No 2-50, Cartagena',
    hours: '10:00 AM - 6:00 PM',
    phone: '+57 5 234 5682',
  },
  {
    id: 5,
    name: 'Punto Bucaramanga',
    city: 'Bucaramanga',
    latitude: 7.1193,
    longitude: -73.1227,
    x: 66,
    y: 28,
    address: 'Carrera 27 No 36-20, Bucaramanga',
    hours: '8:00 AM - 6:00 PM',
    phone: '+57 7 234 5683',
  },
];

export const initializeCitiesGraph = () => {
  citiesGraph.clear();
  citiesGraph.addEdge('Bogota', 'Medellin', 420);
  citiesGraph.addEdge('Bogota', 'Cali', 462);
  citiesGraph.addEdge('Bogota', 'Bucaramanga', 398);
  citiesGraph.addEdge('Medellin', 'Cartagena', 635);
  citiesGraph.addEdge('Cali', 'Cartagena', 800);
  return citiesGraph;
};

export const getAllDeliveryPoints = () => DELIVERY_POINTS;

export const getDeliveryPointsByCity = (city) =>
  DELIVERY_POINTS.filter((point) => point.city === city);

export const getAvailableCities = () => [...new Set(DELIVERY_POINTS.map((point) => point.city))];

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

export const findNearestDeliveryPoint = (userLat, userLon) => {
  let nearest = null;
  let minDistance = Infinity;

  DELIVERY_POINTS.forEach((point) => {
    const distance = calculateDistance(userLat, userLon, point.latitude, point.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = { ...point, distance: minDistance.toFixed(2) };
    }
  });

  return nearest;
};

export const getDeliveryPointsInArea = (lat, lon, radiusKm) =>
  DELIVERY_POINTS.filter((point) => {
    const distance = calculateDistance(lat, lon, point.latitude, point.longitude);
    return distance <= radiusKm;
  }).map((point) => ({
    ...point,
    distance: calculateDistance(lat, lon, point.latitude, point.longitude).toFixed(2),
  }));

export const getRouteBetweenCities = (fromCity) => {
  const graph = initializeCitiesGraph();
  return graph.bfs(fromCity);
};

export const geocodeAddress = async (address) => {
  const params = new URLSearchParams({
    format: 'json',
    limit: '1',
    q: `${address}, Colombia`,
  });

  const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener la ubicacion de la direccion.');
  }

  const results = await response.json();
  if (!results.length) {
    throw new Error('No se encontraron coordenadas para la direccion.');
  }

  return [Number(results[0].lat), Number(results[0].lon)];
};

export const getRouteCoordinates = async (origin, destination) => {
  const [originLat, originLng] = origin;
  const [destinationLat, destinationLng] = destination;
  const coordinates = `${originLng},${originLat};${destinationLng},${destinationLat}`;
  const params = new URLSearchParams({
    overview: 'full',
    geometries: 'geojson',
  });

  const response = await fetch(`${OSRM_URL}/${coordinates}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('No se pudo obtener la ruta del pedido.');
  }

  const data = await response.json();
  const route = data.routes?.[0];
  if (!route?.geometry?.coordinates?.length) {
    throw new Error('La ruta no tiene coordenadas disponibles.');
  }

  return route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
};

export const getCoordinatesByCity = (city) => {
  const point = DELIVERY_POINTS.find((item) => item.city === city);
  return point ? [point.latitude, point.longitude] : DEFAULT_BOGOTA_COORDINATES;
};

export const getBogotaCoordinates = () => DEFAULT_BOGOTA_COORDINATES;
