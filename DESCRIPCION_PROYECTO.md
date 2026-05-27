# 🛍️ MercadoLocal - Descripción del Proyecto

## 📋 Resumen Ejecutivo

**MercadoLocal** es una plataforma de e-commerce colombiana especializada en la venta de productos artesanales y de productores locales. La aplicación conecta consumidores con comerciantes locales, promoviendo el comercio justo y el apoyo a la economía regional.

---

## 🎯 Objetivo Principal

Crear una plataforma web moderna e interactiva que permita a usuarios colombianos:
- Descubrir y comprar productos artesanales de calidad
- Conectar directamente con productores locales
- Disfrutar de envíos rápidos y gratuitos
- Acceder a promociones y ofertas especiales
- Interactuar en tiempo real mediante chat

---

## 🏗️ Stack Tecnológico

**Frontend:**
- React 18 + Vite 8.0.14
- React Router v6 (SPA)
- SCSS Modules (estilos con alcance)
- Context API + useReducer (gestión de estado)

**Backend/Base de datos:**
- Firebase (Autenticación, Firestore, Storage, Realtime Database)

**Pagos:**
- Stripe (modo test)

**Mapas:**
- Google Maps API

**Datos:**
- 5 estructuras de datos implementadas en JavaScript:
  - Queue (FIFO) - Gestión de pedidos
  - Stack (LIFO) - Historial de chats
  - Binary Search Tree - Categorización de productos
  - Max-Heap - Ranking de productos por calificación
  - Weighted Graph - Red de ciudades y puntos de envío

---

## ✅ Funcionalidades COMPLETADAS

### 1. **Header Profesional (Estilo MercadoLibre)**
- Logo de marca
- Barra de búsqueda prominente
- Opciones: "Envíos a tu ubicación" + "ENVÍO GRATIS"
- Navegación principal: Categorías, Ofertas, Marcas, Vendedores, Ayuda
- Carrito con contador de items
- Botones de Login/Registro
- Responsive (mobile, tablet, desktop)

### 2. **Carousel/Slider Interactivo**
- 5 banners publicitarios rotativos
- Auto-rotación cada 5 segundos
- Navegación manual con botones < y >
- Indicadores de puntos clickeables
- Transiciones suaves
- Banners temáticos:
  - Envío Gratis
  - Álbum Copa Mundial 2026
  - Productos Artesanales
  - Promoción Especial
  - Envíos a Todo el País

### 3. **Catálogo de Productos**
- Grid responsive (3-5 columnas según pantalla)
- 10 productos dummy con:
  - Imagen de alta calidad (Unsplash)
  - Nombre y descripción
  - Categoría
  - Calificación (★★★★★)
  - Precio en COP
  - Vendor/Productor
  - Estado de stock (In Stock/Out of Stock)
  - Botón "Agregar al carrito"

### 4. **Sistema de Filtros**
- **Búsqueda por texto**: Búsqueda en tiempo real
- **Categorías**: Artesanía, Comida Orgánica, Ropa Hecha a Mano, Joyería, Plantas (5 opciones)
- **Rango de precios**: <$50k, $50k-$100k, $100k-$200k, >$200k
- **Calificación**: 5⭐, 4⭐, 3⭐, 2⭐, 1⭐
- Botón "Limpiar filtros"
- Aplicación en tiempo real

### 5. **Carrito de Compras**
- Persistencia en localStorage
- Suma/resta de cantidades
- Eliminar items
- Cálculo automático de totales
- Contador visible en header
- Badge rojo con número de items

### 6. **Contextos & State Management**
- **AuthContext**: Usuario, autenticación, rol (user/vendor/admin)
- **ProductContext**: Catálogo, filtros, búsqueda
- **CartContext**: Items, cantidades, totales
- **ChatContext**: Conversaciones, mensajes
- **AdminContext**: Estadísticas, órdenes

### 7. **Diseño Visual**
- Paleta de colores VERDE principal (#22c55e, #16a34a)
- Detalles decorativos con colores de bandera colombiana (Amarillo, Azul, Rojo)
- Tipografía moderna y legible
- Diseño responsive en todos los dispositivos
- Transiciones suaves y efectos hover

---

## ⏳ Funcionalidades PENDIENTES

### 1. **Autenticación (Login/Registro)**
- Página de login con email/password
- Página de registro con validación
- Integración con Firebase Authentication
- Roles: Cliente, Vendedor, Admin
- Recuperación de contraseña

### 2. **Carrito de Compras Completo**
- Página del carrito (visualizar items)
- Resumen de totales
- Cantidades editables
- Eliminar items
- Botón "Proceder al checkout"

### 3. **Proceso de Checkout**
- Selección de dirección de envío
- Selección de método de pago
- Integración con Stripe (test mode)
- Resumen de orden
- Confirmación de compra

### 4. **Página de Detalle de Producto**
- Información completa del producto
- Galería de imágenes
- Descripción detallada
- Reviews y calificaciones
- Información del vendedor
- Productos relacionados
- Opción de agregar a carrito

### 5. **Chat en Tiempo Real**
- Interfaz de chat
- Conversaciones con productores/vendedores
- Histórico de mensajes
- Notificaciones
- Integración con Firebase Realtime Database

### 6. **Mapa Interactivo**
- Google Maps embedded
- Puntos de entrega (5 ciudades: Bogotá, Medellín, Cali, Cartagena, Santa Marta)
- Búsqueda de puntos cercanos
- Información de horarios y contacto

### 7. **Perfil de Usuario**
- Información personal
- Historial de órdenes
- Direcciones guardadas
- Métodos de pago
- Configuración de cuenta
- Opción de convertirse en vendedor

### 8. **Panel de Vendedor**
- Dashboard con estadísticas
- Gestión de productos (CRUD)
- Gestión de órdenes
- Análisis de ventas
- Mensajes de clientes

### 9. **Panel de Admin**
- Dashboard con KPIs
- Gestión de usuarios
- Gestión de productos
- Gestión de órdenes
- Reporte de ventas

### 10. **Página de Ofertas/Promociones**
- Banner de promociones activas
- Descuentos especiales
- Código de cupones
- Productos en oferta destacados

### 11. **Página "Sobre Nosotros"**
- Misión y visión de MercadoLocal
- Historia de la empresa
- Valores
- Equipo
- Contacto

### 12. **Footer**
- Links de navegación
- Información de contacto
- Redes sociales
- Políticas (privacidad, términos)
- Suscripción a newsletter

### 13. **Funcionalidades Avanzadas**
- Recomendaciones personalizadas
- Wishlist/Favoritos
- Notificaciones push
- Sistema de ratings y reviews
- Búsqueda avanzada con filtros múltiples
- Categorización por vendedor

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Verde Primario | #22c55e | Botones, acciones principales |
| Verde Secundario | #16a34a | Gradientes, hover |
| Amarillo (Colombia) | #FFD700 | Detalles decorativos |
| Azul (Colombia) | #003087 | Detalles decorativos |
| Rojo (Colombia) | #CE1126 | Detalles decorativos |
| Blanco | #FFFFFF | Fondos claros |
| Gris Claro | #f0fdf4 | Background |
| Gris Oscuro | #1f2937 | Textos principales |

---

## 📱 Breakpoints Responsive

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

---

## 📊 Estructura de Carpetas

```
src/
├── components/
│   ├── shared/
│   │   ├── Header.jsx / Header.module.scss
│   │   ├── HeroBanner.jsx / HeroBanner.module.scss
│   │   └── Footer.jsx (pendiente)
│   ├── products/
│   │   ├── ProductCard.jsx / ProductCard.module.scss
│   │   ├── ProductList.jsx / ProductList.module.scss
│   │   ├── Filters.jsx / Filters.module.scss
│   │   └── ProductDetail.jsx (pendiente)
│   └── auth/
│       ├── LoginPage.jsx (pendiente)
│       ├── RegisterPage.jsx (pendiente)
│       └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── ProductContext.jsx
│   ├── CartContext.jsx
│   ├── ChatContext.jsx
│   └── AdminContext.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── CartPage.jsx (pendiente)
│   ├── CheckoutPage.jsx (pendiente)
│   ├── ChatPage.jsx (pendiente)
│   └── MapsPage.jsx (pendiente)
├── services/
│   ├── authService.js
│   ├── productService.js
│   ├── cartService.js
│   ├── chatService.js
│   ├── paymentService.js
│   └── mapService.js
├── helpers/
│   ├── Queue.js
│   ├── Stack.js
│   ├── BinaryTree.js
│   ├── Heap.js
│   ├── Graph.js
│   └── utils.js
├── data/
│   ├── dummyData.js
│   └── bannerData.js
└── styles/
    └── global.scss
```

---

## 🎯 Flujo de Usuario Principal

1. **Entrada**: Usuario accede a la página
   - Ve header, carousel y productos
   - Puede buscar, filtrar y ordenar

2. **Exploración**: Interactúa con productos
   - Agrega items al carrito
   - Ve contador actualizado

3. **Carrito**: Revisa su compra
   - Visualiza items y totales
   - Puede modificar cantidades

4. **Login/Registro** (si es nuevo usuario)
   - Crea cuenta o inicia sesión
   - Completa perfil

5. **Checkout**: Procesa la compra
   - Ingresa dirección de envío
   - Selecciona método de pago (Stripe)
   - Confirma orden

6. **Seguimiento**: Post-compra
   - Ve historial de órdenes
   - Puede contactar vendedor vía chat
   - Deja reviews

---

## 🚀 Próximos Pasos para Figma

1. Diseñar páginas pendientes (Login, Registro, Carrito, Checkout)
2. Crear componentes reutilizables
3. Definir states y microinteracciones
4. Crear sistema de componentes (design system)
5. Prototipar flujos principales
6. Validar con usuario

---

## 📞 Información de Contacto

**Equipo**: 3 desarrolladores
**Plazo**: ~2 semanas
**Tecnologías**: React, Firebase, Stripe, Google Maps
**Estado**: MVP completado, funcionalidades adicionales en desarrollo
**Despliegue**: Netlify

---

**Última actualización**: 27 de Mayo, 2026
