# FLBA Store

E-commerce construido con **Next.js (App Router)**, orientado a rendimiento,
SEO y una arquitectura que escale con varios desarrolladores. Es la solución al
[Reto Técnico 2026 — Frontend Senior](docs/Reto%20T%C3%A9cnico%202026.pdf).

> **Estado:** en desarrollo. El catálogo, la paginación por URL, la metadata
> dinámica del detalle, el modo claro/oscuro y las pantallas de error ya
> funcionan. Quedan por completar los filtros, la búsqueda, el carrito, la
> vista del detalle y las pruebas. El detalle está en
> [Estado frente al reto](#estado-frente-al-reto).

## Contenido

- [Características](#características)
- [Stack](#stack)
- [Primeros pasos](#primeros-pasos)
- [Variables de entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Arquitectura](#arquitectura)
- [Decisiones técnicas](#decisiones-técnicas)
- [Estado frente al reto](#estado-frente-al-reto)
- [Autor](#autor)

## Características

- **Catálogo renderizado en el servidor** con Server Components: el HTML llega
  con los productos ya incluidos.
- **Paginación en la URL** (`?page=2`): enlaces reales, compartibles y
  rastreables por buscadores. Una página fuera de rango muestra la página 404.
- **Metadata dinámica en el detalle** (`/products/[id]`): título, descripción,
  Open Graph, Twitter Card y URL canónica a partir de los datos del producto.
- **Caché con tags** en cada llamada a la API, para poder invalidar por
  recurso.
- **Modo claro y oscuro** con persistencia y seguimiento de la preferencia del
  sistema (`next-themes`).
- **Pantallas de error y 404** personalizadas, con el layout de la tienda.
- **Sistema de diseño propio**: tokens, componentes con variantes y estilos
  encapsulados.
- **Límites entre capas verificados por ESLint.**

## Stack

| Área              | Tecnología                                                  |
| ----------------- | ----------------------------------------------------------- |
| Framework         | Next.js 16 (App Router) y React 19                          |
| Lenguaje          | TypeScript en modo estricto                                 |
| Estilos           | Tailwind CSS 4 y CSS Modules                                |
| Datos             | `fetch` con la caché de Next; TanStack Query 5 para el cliente |
| Validación        | zod 4 (variables de entorno)                                |
| Tema              | next-themes                                                 |
| Iconos y utilidades | lucide-react, clsx, tailwind-merge                        |
| Calidad           | ESLint 9 con reglas de arquitectura                         |
| Gestor de paquetes | pnpm                                                       |

## Primeros pasos

**Requisitos:** Node.js 20.9 o superior (desarrollado con la 22) y
[pnpm](https://pnpm.io).

```bash
git clone https://github.com/FernandoLBA/flba-next-commerce.git
cd flba-next-commerce
pnpm install
```

Crea el archivo `.env.local` en la raíz (ver
[Variables de entorno](#variables-de-entorno)):

```bash
NEXT_PUBLIC_API_URL=https://dummyjson.com
APP_SERVER_URL=http://localhost:3000
```

Inicia el servidor de desarrollo y abre <http://localhost:3000>:

```bash
pnpm dev
```

## Variables de entorno

Se validan con zod al iniciar. Si falta alguna o no es una URL válida, la
aplicación falla con un mensaje claro.

| Variable              | Ámbito   | Descripción                                                  | Ejemplo                 |
| --------------------- | -------- | ------------------------------------------------------------ | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Cliente  | URL base de la API de productos                              | `https://dummyjson.com` |
| `APP_SERVER_URL`      | Servidor | URL pública del sitio; base de las URLs absolutas de metadata | `http://localhost:3000` |

En producción, `APP_SERVER_URL` debe ser el dominio real del sitio. Las
variables con prefijo `NEXT_PUBLIC_` se incorporan en el build, así que
cambiarlas exige volver a construir.

## Scripts

| Comando          | Descripción                              |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo                   |
| `pnpm build`     | Build de producción                      |
| `pnpm start`     | Sirve el build de producción             |
| `pnpm lint`      | ESLint, incluidas las reglas de capas    |
| `pnpm rem:next`  | Borra la carpeta `.next`                 |

## Arquitectura

Capas orientadas al dominio, con dependencias en un único sentido:

```
app  →  features  →  shared
```

```
src/
  app/                  Rutas, layouts y metadata (sin lógica de negocio)
  features/products/    Dominio de productos: componentes, hooks,
                        servicios, tipos y vistas. Expone un único index.ts
  shared/               Cliente HTTP, componentes UI, config, utilidades
docs/
  architecture.md       Decisiones técnicas con más detalle
```

- Una feature solo se importa por su `index.ts`.
- `shared` nunca importa de `features` ni de `app`.
- Estas reglas las hace cumplir ESLint: `pnpm lint` falla si se rompen.

La guía completa (estructura, convenciones, servidor y cliente, caché, estilos
y estado) está en [`docs/architecture.md`](docs/architecture.md).

## Decisiones técnicas

**Renderizado.** El listado y el detalle son Server Components. Las partes
interactivas (paginación, tema) son componentes de cliente aislados, para
enviar poco JavaScript.

**Estado en la URL.** La página (y, cuando estén, categoría, búsqueda y orden)
viven en los `searchParams`. Así cada vista es compartible e indexable, y no
hay un store duplicando lo que ya dice la URL.

**API.** Se usa [DummyJSON](https://dummyjson.com). El reto sugería FakeStore
API, que no estaba disponible durante el desarrollo; DummyJSON ofrece los
mismos recursos y además búsqueda, orden y paginación. La forma de su
respuesta (`skip`, `limit`, `total`) está aislada en los servicios, de modo
que el resto de la aplicación trabaja con `page` y `totalPages` y no depende
de la API.

**Caché.** Cada llamada declara tags (`products`, `product-{id}`,
`categories`); el listado revalida cada 60 s. Los `fetch` de metadata y de la
página se deduplican con `React.cache`.

**Estilos.** Tailwind 4 con los tokens en `globals.css` y CSS Modules por
componente (con `@reference` y `@apply` dentro de `@layer components`, para
que las utilidades de Tailwind puedan sobrescribirlos). El tema usa
selectores `[data-theme]` y `next-themes`.

**Carrito (decisión planificada).** Zustand con `persist`, detrás de una
fachada `useCart()`. Es estado propio de cada usuario, así que no encaja en la
caché de Next ni en la URL; la fachada permite pasar a un carrito de servidor
más adelante sin tocar los componentes. El razonamiento completo está en
[`docs/architecture.md`](docs/architecture.md#gestión-de-estado).

## Estado frente al reto

| Requisito                                              | Estado |
| ------------------------------------------------------ | ------ |
| Listado renderizado en servidor (Server Components)    | Hecho  |
| Paginación en la URL, compartible e indexable          | Hecho  |
| Filtro por categorías en la URL                        | Pendiente: el servicio de categorías existe, falta la interfaz |
| Búsqueda por texto u ordenamiento                      | Pendiente |
| Ruta dinámica `/products/[id]`                         | Hecho (la vista del detalle está por completar) |
| Metadata dinámica (título, descripción, Open Graph)    | Hecho  |
| Botón "Agregar al carrito" con estado global en el header | Pendiente |
| Optimización de imágenes y lazy loading                | En curso |
| Streaming con Suspense y skeletons                     | Pendiente |
| Manejo de errores (`error.tsx`) y estados vacíos       | Errores y 404 hechos; falta el estado vacío |
| Configuración de caché y revalidación                  | Hecho en el listado; pendiente en detalle y categorías |
| Pruebas unitarias o de integración                     | Pendiente |
| Datos estructurados JSON-LD de producto                | El componente existe; falta renderizarlo en el detalle |

Próximos pasos, por orden: filtros, búsqueda y orden en la URL; vista del
detalle; carrito con estado global; pruebas; skeletons y estados vacíos.

## Autor

Desarrollado por [fernandolba](https://fernandolba.com).
