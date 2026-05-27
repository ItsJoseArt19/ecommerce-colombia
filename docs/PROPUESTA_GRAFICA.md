# Propuesta grafica definitiva

## Concepto

MercadoLocal Colombia se plantea como un marketplace sobrio, confiable y orientado a compra. La interfaz evita una estetica de plantilla y prioriza catalogo, busqueda, carrito, confianza, rutas de entrega y soporte.

## Identidad visual

- Nombre: MercadoLocal.
- Color primario: verde comercial `#16a34a`.
- Colores de respaldo: amarillo `#ffd700`, azul `#003087` y rojo `#ce1126` como referencia a Colombia.
- Fondo de aplicacion: gris operativo `#f5f7fb`.
- Superficies: blanco con bordes `#e5e7eb`.
- Tipografia: system UI para rendimiento y legibilidad.
- Bordes: 6px a 8px para una UI profesional y consistente.

## Pantallas base para Figma o Adobe

1. Home publica:
   - Header sticky con busqueda, acceso, registro y carrito.
   - Hero de marketplace.
   - Indicadores de confianza.
   - Categorias.
   - Ranking de productos.
   - Catalogo con filtros.

2. Login y registro:
   - Formulario centrado.
   - Estados de error.
   - Redireccion tras autenticacion.

3. Carrito:
   - Lista editable.
   - Resumen de compra.
   - Indicador de cola FIFO y ultimo producto agregado.

4. Checkout:
   - Formulario de datos.
   - Metodo de pago.
   - Confirmacion de orden.

5. Entregas:
   - Producto comprado.
   - Estado del pedido.
   - Ruta de seguimiento generada con grafo.

6. Chat:
   - Conversacion.
   - Entrada de mensaje.
   - Historial apilado.
   - Acceso solo para usuarios autenticados con compra pagada.

## Componentes

- `Header`: navegacion publica y privada.
- `HeroBanner`: presentacion principal.
- `ProductList`: catalogo y ordenamiento.
- `ProductCard`: tarjeta de producto.
- `Filters`: filtros por busqueda, categoria, precio y rating.
- Paginas en `src/pages`.
- Rutas en `src/routes`.

## Comportamiento esperado

La plataforma web implementada debe respetar esta propuesta: jerarquia clara, acciones visibles, carrito funcional, rutas publicas/privadas, estados de feedback y estructura modular.
