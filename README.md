# FLBA Store

E-commerce construido con **Next.js (App Router)**, orientado a rendimiento,
SEO y una arquitectura que escale con varios desarrolladores. Es la solución al
[Reto Técnico 2026 — Frontend Senior](docs/Reto%20T%C3%A9cnico%202026.pdf).

- **Sitio desplegado:** <https://flba-next-commerce.vercel.app>
- **Repositorio:** <https://github.com/FernandoLBA/flba-next-commerce>
- **Presentación del proyecto:** la página `/about` («Sobre este challenge»)
  reúne la presentación, el video explicativo y este mismo README.

> **Estado:** en desarrollo, con el flujo principal completo: catálogo con
> paginación y filtro por categoría, detalle de producto con metadata
> dinámica, carrito con estado global y contador en el header, modo
> claro/oscuro, pantallas de error y pruebas automatizadas (unitarias,
> de integración y extremo a extremo) con integración continua. Faltan la
> búsqueda y el ordenamiento y el streaming con skeletons. El detalle está en
> [Estado frente al reto](#estado-frente-al-reto).

## Contenido

- [Características](#características)
- [Stack](#stack)
- [Primeros pasos](#primeros-pasos)
- [Variables de entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Pruebas](#pruebas)
- [Rendimiento](#rendimiento)
- [Arquitectura](#arquitectura)
- [Decisiones técnicas](#decisiones-técnicas)
- [Limitaciones conocidas](#limitaciones-conocidas)
- [Estado frente al reto](#estado-frente-al-reto)
- [Autor](#autor)

## Características

- **Catálogo renderizado en el servidor** con Server Components: el HTML llega
  con los productos ya incluidos.
- **Filtro por categoría y paginación en la URL** (`?category=beauty&page=2`):
  enlaces reales, compartibles y rastreables por buscadores. Una página fuera
  de rango o una categoría inexistente muestran la página 404.
- **Detalle de producto** (`/products/[id]`) con galería, precio, descuento,
  disponibilidad, ficha técnica y reseñas.
- **SEO en el detalle:** título, descripción, Open Graph, Twitter Card, URL
  canónica y datos estructurados JSON-LD (`Product`), todo a partir de los
  datos del producto. Un producto inexistente responde con un 404 real.
- **Carrito de compras** con estado global (Zustand), persistido en el
  navegador, con selector de cantidad limitado por el stock y un contador en
  el header.
- **Caché con tags y revalidación** en cada llamada a la API.
- **Modo claro y oscuro** con persistencia y seguimiento de la preferencia del
  sistema (`next-themes`).
- **Navegación móvil** con un drawer accesible (`<dialog>` nativo) que incluye
  las categorías.
- **Pantallas de error y 404** personalizadas, con el layout de la tienda.
- **Sistema de diseño propio:** tokens de color por tema, escala tipográfica y
  componentes con variantes y estilos encapsulados.
- **Límites entre capas verificados por ESLint.**
- **Pruebas automatizadas y CI:** Vitest y React Testing Library para la lógica
  y los componentes, Playwright para el flujo de compra, y un workflow de
  GitHub Actions que lo ejecuta todo en cada cambio.

## Stack

| Área                | Tecnología                                                      |
| ------------------- | --------------------------------------------------------------- |
| Framework           | Next.js 16 (App Router) y React 19                              |
| Lenguaje            | TypeScript en modo estricto                                     |
| Estilos             | Tailwind CSS 4 y CSS Modules                                    |
| Estado global       | Zustand 5 con `persist` (carrito)                               |
| Datos               | `fetch` con la caché de Next; TanStack Query 5 configurado para las partes interactivas del cliente |
| Validación          | zod 4 (variables de entorno)                                    |
| Tema                | next-themes                                                     |
| Iconos y utilidades | lucide-react, clsx, tailwind-merge                              |
| Pruebas             | Vitest 5 y React Testing Library (unitarias e integración); Playwright (extremo a extremo) |
| Calidad             | ESLint 9 con reglas de arquitectura; GitHub Actions               |
| Gestor de paquetes  | pnpm                                                            |

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

| Variable              | Ámbito   | Descripción                                                   | Ejemplo                 |
| --------------------- | -------- | ------------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Cliente  | URL base de la API de productos                               | `https://dummyjson.com` |
| `APP_SERVER_URL`      | Servidor | URL pública del sitio; base de las URLs absolutas de metadata | `http://localhost:3000` |

En producción, `APP_SERVER_URL` debe ser el dominio real del sitio (por ejemplo,
`https://flba-next-commerce.vercel.app`). Las
variables con prefijo `NEXT_PUBLIC_` se incorporan en el build, así que
cambiarlas exige volver a construir.

## Scripts

| Comando         | Descripción                           |
| --------------- | ------------------------------------- |
| `pnpm dev`      | Servidor de desarrollo                |
| `pnpm build`    | Build de producción                   |
| `pnpm start`    | Sirve el build de producción          |
| `pnpm lint`     | ESLint, incluidas las reglas de capas |
| `pnpm test`     | Pruebas unitarias y de integración (Vitest) |
| `pnpm test:watch` | Vitest en modo observador          |
| `pnpm test:e2e` | Pruebas extremo a extremo (Playwright) |
| `pnpm rem:next` | Borra la carpeta `.next`              |

Si el servidor de desarrollo muestra errores de utilidades de Tailwind
desconocidas tras añadir una en `globals.css`, reinícialo con
`pnpm rem:next` y `pnpm dev`.

## Pruebas

La estrategia prioriza lo que concentra lógica de negocio y los flujos críticos,
no una cobertura total. Hoy hay 64 pruebas unitarias y de integración y 9 de
extremo a extremo.

| Nivel | Herramienta | Qué cubre |
| --- | --- | --- |
| Lógica pura | Vitest | Paginación (`skip`/`total`/`limit` a páginas, incluida la última), recortes de texto, precios y porcentajes |
| Estado | Vitest | Store del carrito: sumar al repetir, límite de stock, cantidades, quitar, vaciar, selectores (subtotal en céntimos) y persistencia con rehidratación manual |
| Servicios | Vitest con `fetch` simulado | Parámetros pedidos a la API, ruta por categoría, tags y `revalidate`, paginación calculada |
| Componentes | Vitest + React Testing Library | Contador del carrito (no se pinta antes de hidratar, `99+`), botón de agregar, vista del carrito, paginación (enlaces que conservan la categoría), barra de categorías, JSON-LD |
| Extremo a extremo | Playwright | Compra completa (filtrar por categoría, detalle, agregar, contador, carrito, persistencia tras recargar), 404 en cinco casos, metadata y datos estructurados del detalle |

Las pruebas viven junto al archivo que prueban (`cart.store.test.ts`) y las de
extremo a extremo, en `e2e/`. Dos de ellas son de regresión de fallos reales:
la paginación de la última página y el límite de stock del carrito.

```bash
pnpm test                              # unitarias e integración
pnpm exec playwright install chromium  # solo la primera vez
pnpm test:e2e                          # compila, arranca el servidor en el puerto 3100 y prueba
```

Las pruebas extremo a extremo ejecutan el build de producción contra la API
real de DummyJSON. Los Server Components asíncronos no se pueden probar con
React Testing Library, por eso su cobertura está en este nivel. El workflow
[`.github/workflows/ci.yml`](.github/workflows/ci.yml) ejecuta lint, tipos,
pruebas y build, y después las pruebas extremo a extremo.

## Rendimiento

Medido sobre el sitio desplegado (página de inicio, 5 de octubre de 2026):

| Herramienta                                   | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
| --------------------------------------------- | ----------- | ------------- | ---------------- | --- |
| Lighthouse (Chrome DevTools, escritorio)      | 100         | 96            | 100              | 100 |
| PageSpeed Insights (móvil)                    | 95          | 96            | 100              | 100 |

En móvil, el primer contenido pintado (FCP) tarda 0,9 s y el contenido más
grande (LCP), 2,9 s, que cae en el rango «por mejorar» (2,5–4 s) y es el punto
a trabajar. PageSpeed Insights no tiene todavía datos de usuarios reales del
sitio. Para repetir la medición: abrir el sitio, Lighthouse en DevTools, o
pegar la URL en <https://pagespeed.web.dev>.

Lo que sostiene estas cifras: Server Components (HTML con el contenido ya
incluido), `next/image` con `sizes` y `priority` solo en lo visible, contenedores
con proporción fija para evitar saltos de diseño, caché con tags y
`revalidate`, y poco JavaScript de cliente.

## Arquitectura

Capas orientadas al dominio, con dependencias en un único sentido:

```
app  →  features  →  shared
```

```
src/
  app/                  Rutas, layouts y metadata (sin lógica de negocio)
  features/
    products/           Catálogo, detalle, categorías: componentes, servicios,
                        tipos y vistas
    cart/               Botón de agregar, filas y vista del carrito
    about/              Página «Sobre este challenge»
  shared/
    api/                Cliente HTTP
    components/         ui/ (piezas genéricas) y layout/ (header, footer)
    stores/cart/        Estado global del carrito (Zustand)
    providers/          Tema, React Query, categorías, hidratación del carrito
    config/ constants/ hooks/ types/ utils/
e2e/                    Pruebas extremo a extremo (Playwright)
.github/workflows/      Integración continua
docs/
  architecture.md       Decisiones técnicas con más detalle
```

- Una feature solo se importa por su `index.ts`.
- `shared` nunca importa de `features` ni de `app`.
- Estas reglas las hace cumplir ESLint: `pnpm lint` falla si se rompen.

La guía completa (estructura, convenciones, servidor y cliente, caché,
estilos y estado) está en [`docs/architecture.md`](docs/architecture.md).

## Decisiones técnicas

**Renderizado.** El listado y el detalle son Server Components. Las partes
interactivas (paginación, tema, galería, carrito) son componentes de cliente
aislados, para enviar poco JavaScript.

**Estado en la URL.** La página y la categoría viven en los `searchParams`.
Así cada vista es compartible e indexable, y no hay un store duplicando lo que
ya dice la URL.

**API.** Se usa [DummyJSON](https://dummyjson.com). El reto sugería FakeStore
API, que no estaba disponible durante el desarrollo; DummyJSON ofrece los
mismos recursos y además búsqueda, orden y paginación. La forma de su
respuesta (`skip`, `limit`, `total`) está aislada en los servicios, de modo
que el resto de la aplicación trabaja con `page` y `totalPages`. Un detalle
relevante: la API devuelve en `limit` los elementos que trajo, no el límite
pedido, así que la paginación usa el límite solicitado.

**Caché.** Cada llamada declara tags (`products`, `product-{id}`,
`categories`) y un `revalidate`: el listado, 60 s; el detalle, 5 min; las
categorías, 24 h. Los `fetch` de metadata y de la página se deduplican con
`React.cache`. Para el cliente, TanStack Query usa el mismo tiempo como
`staleTime`.

**Categorías compartidas.** El layout de la tienda las pide una vez (con la
caché de Next) y las reparte con un Context. Las consumen el sidebar de
`/products` y el drawer móvil sin pasar props por el header. No se usa un
store para esto: son datos del servidor, de solo lectura.

**Carrito.** Zustand con `persist` en `localStorage`. Es estado propio de cada
usuario y cambia con cada clic, así que no cabe en la caché de Next (compartida
entre usuarios) ni en la URL. Guarda solo los ítems con una copia mínima de lo
que se muestra (título, precio, miniatura, stock); el subtotal y el contador
se derivan con selectores. Para evitar diferencias de hidratación entre
servidor y cliente, el store se rehidrata al montar y el contador no se pinta
hasta entonces. El impacto en memoria es mínimo: una lista pequeña de objetos
planos.

**Estilos.** Tailwind 4 con los tokens en `globals.css` y CSS Modules por
componente de `ui/` (con `@reference` y `@apply` dentro de `@layer components`,
para que las utilidades de Tailwind puedan sobrescribirlos). El tema usa
selectores `[data-theme]` y `next-themes`. La tipografía es una escala única
de utilidades `typo-*`.

## Limitaciones conocidas

- **El carrito es local.** Vive en el navegador: no se sincroniza entre
  dispositivos y el servidor no valida precio ni stock. Está diseñado para
  poder pasar a un carrito de servidor sin cambiar la interfaz.
- **El pago no está implementado.** El botón de pago del carrito está
  deshabilitado; queda fuera del alcance del reto.
- **Textos de la API.** Los nombres de categorías y los datos de envío,
  garantía y devoluciones vienen en inglés y se muestran tal cual.
- **Pruebas extremo a extremo y red.** Dependen de la disponibilidad de
  DummyJSON, porque el servidor consulta la API real y no se puede interceptar
  desde el navegador. Por eso son pocas y centradas en los flujos críticos.
- **Datos de ejemplo.** DummyJSON es una API de pruebas: algunos valores (por
  ejemplo, el pedido mínimo de ciertos productos) no son realistas.
- **Descuento.** La tarjeta y el detalle muestran el precio de la API como
  precio actual y calculan el precio anterior a partir del porcentaje de
  descuento.

## Estado frente al reto

| Requisito                                                  | Estado |
| ---------------------------------------------------------- | ------ |
| Listado renderizado en servidor (Server Components)        | Hecho  |
| Filtro por categorías en la URL, compartible e indexable   | Hecho  |
| Paginación en la URL                                       | Hecho  |
| Búsqueda por texto u ordenamiento                          | Pendiente |
| Ruta dinámica `/products/[id]`                             | Hecho  |
| Metadata dinámica (título, descripción, Open Graph)        | Hecho  |
| Datos estructurados JSON-LD de producto                    | Hecho  |
| «Agregar al carrito» con estado global y contador en header | Hecho |
| Justificación de la estrategia de estado del carrito       | Hecho (ver [Decisiones técnicas](#decisiones-técnicas)) |
| Optimización de imágenes, lazy loading y métricas          | Hecho: `next/image` con `sizes` y `priority`; medido en producción (ver [Rendimiento](#rendimiento)), con el LCP móvil en 2,9 s por mejorar |
| Streaming con Suspense y skeletons                         | Pendiente |
| Manejo de errores (`error.tsx`), 404 y estados vacíos      | Errores, 404 y carrito vacío hechos; falta el estado vacío del listado |
| Caché y revalidación                                       | Hecho (tags y `revalidate`); la invalidación a demanda no está implementada |
| Pruebas unitarias o de integración                         | Hecho (Vitest y React Testing Library) y extremo a extremo (Playwright) |
| Integración continua                                       | Hecho (GitHub Actions: lint, tipos, pruebas y build) |
| README con instrucciones de ejecución                      | Hecho  |
| Repositorio público                                        | [Hecho](https://github.com/FernandoLBA/flba-next-commerce) |
| Publicado en un servidor                                   | [Hecho](https://flba-next-commerce.vercel.app) (Vercel) |

Próximos pasos, por orden: búsqueda y orden en la URL; skeletons y estados
vacíos; mejorar el LCP móvil y la accesibilidad (96).

## Autor

Desarrollado por [fernandolba](https://fernandolba.com).
