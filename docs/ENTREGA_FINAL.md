# Documento final del sistema

## Alcance

MercadoLocal Colombia es una plataforma frontend de ecommerce para venta de productos locales. Incluye experiencia publica de compra, autenticacion, carrito, checkout protegido, chat con vendedor, seguimiento de pedidos por grafo y estructura administrativa basica.

## Tecnologias utilizadas

- React: construccion de UI por componentes.
- Vite: entorno de desarrollo y build.
- Sass modules: estilos encapsulados por componente.
- React Router: navegacion publica, privada y administrativa.
- Firebase Auth: login y registro real.
- Firestore: almacenamiento de usuarios y datos transaccionales.
- Firebase Realtime Database: base para chat en tiempo real.
- Firebase Storage: disponible para archivos/productos.
- Stripe: preparada para integracion de pagos.

## Estructuras de datos implementadas

1. Pila (`Stack`)
   - Archivo: `src/helpers/Stack.js`.
   - Uso: historial de mensajes en chat y ultimo producto agregado al carrito.
   - Motivo: permite consultar rapidamente el ultimo evento con comportamiento LIFO.

2. Cola (`Queue`)
   - Archivo: `src/helpers/Queue.js`.
   - Uso: orden de procesamiento de productos en carrito/checkout.
   - Motivo: las ordenes deben atenderse en secuencia FIFO.

3. Heap maximo (`Heap`)
   - Archivo: `src/helpers/Heap.js`.
   - Uso: ranking de productos mejor calificados.
   - Motivo: permite priorizar productos por calificacion y reseñas.

4. Arbol binario (`BinaryTree`)
   - Archivo: `src/helpers/BinaryTree.js`.
   - Uso: ordenamiento y recorrido de categorias.
   - Motivo: representa jerarquia/orden de busqueda para categorias del catalogo.

5. Grafo (`Graph`)
   - Archivo: `src/helpers/Graph.js`.
   - Uso: red de ciudades y rutas logisticas en puntos de entrega.
   - Motivo: las ciudades se modelan como nodos conectados por rutas.

La integracion visible se centraliza en `src/helpers/commerceStructures.js`.

## Navegacion

- `/`: home y catalogo.
- `/login`: ingreso.
- `/registro`: registro.
- `/carrito`: carrito de compras.
- `/checkout`: finalizacion de compra, protegida por login y carrito con productos.
- `/entregas`: seguimiento del pedido comprado mediante ruta por grafo.
- `/chat`: chat con vendedor, protegido por login y habilitado solo despues de una compra pagada.
- `/mi-cuenta`: ruta privada de usuario.
- `/admin`: ruta privada de administrador.

## Base de datos y autenticacion

El registro usa Firebase Auth y crea un documento en Firestore bajo la coleccion `users`. El login mantiene sesion con `onAuthStateChanged`. El checkout y el chat exigen usuario autenticado. El chat tiene servicio preparado para Realtime Database.

## Reglas ecommerce aplicadas

- No se puede pagar sin iniciar sesion.
- No se puede entrar al checkout con carrito vacio.
- Los productos agotados no se pueden agregar al carrito.
- El carrito permite sumar, restar y quitar productos.
- El seguimiento de entregas se habilita solo con una orden pagada.
- La comunicacion con vendedor requiere usuario identificado y una orden pagada.

## Pendientes antes de publicacion

- Agregar enlaces definitivos de Figma/Adobe, GitHub y Netlify en `README.md`.
- Configurar reglas de seguridad Firebase.
- Confirmar que Authentication Email/Password este habilitado en Firebase Console.
- Opcional: limpiar reglas ESLint heredadas para entrega sin warnings.
