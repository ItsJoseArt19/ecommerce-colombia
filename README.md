# MercadoLocal Colombia

Marketplace web para productos colombianos con catalogo, filtros, carrito, checkout, login/registro con Firebase, chat post-compra y seguimiento de pedidos por grafo.

## Enlaces de entrega

- GitHub: pendiente de agregar URL del repositorio.
- Rama principal: `main`.
- Propuesta grafica Figma/Adobe: pendiente de agregar enlace publico.
- Frontend publicado: pendiente de agregar enlace de Netlify/Vercel.
- Backend: Firebase Auth, Firestore y Realtime Database.

## Integrantes y ramas

- Integrante 1: pendiente - rama `main` o rama asignada.
- Integrante 2: pendiente - rama asignada.
- Integrante 3: pendiente - rama asignada.

## Tecnologias

- React 19 + Vite.
- React Router DOM.
- Sass modules.
- Firebase Auth, Firestore, Storage y Realtime Database.
- Integracion de pagos preparada con Stripe.
- Estructuras de datos propias en `src/helpers`.

## Funcionalidades implementadas

- Home profesional con hero, categorias, ranking y catalogo.
- Login y registro reales mediante Firebase Auth.
- Creacion de documento de usuario en Firestore al registrarse.
- Rutas publicas, privadas de usuario y privadas de administrador.
- Carrito persistente en `localStorage`, con pago bloqueado si esta vacio.
- Checkout protegido: solo usuarios autenticados pueden confirmar ordenes.
- Chat con vendedor protegido por login y habilitado solo despues de pago aprobado.
- Seguimiento de pedidos con rutas por grafo.
- Documentacion final en `docs/ENTREGA_FINAL.md`.
- Propuesta grafica documentada en `docs/PROPUESTA_GRAFICA.md`.

## Estructura relevante

```txt
src/
  components/
    products/
    shared/
  context/
  data/
  helpers/
  hooks/
  pages/
  routes/
  services/
```

## Variables de entorno

Crear un archivo `.env` con las variables Firebase, Google Maps y Stripe. El proyecto incluye `.env.example` como referencia.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Nota de calidad

`npm run build` compila correctamente. `npm run lint` conserva errores heredados por reglas de Fast Refresh y wrappers `try/catch` en servicios existentes; no bloquean la ejecucion, pero conviene limpiarlos antes de la entrega final.
