import { appRoutes } from "./app.routes";

export const appSettings = {
  APP_NAME: "FLBA Store",
  APP_DESCRIPTION:
    "Esta es una E-commerce hecha con buenas prácticas, usando NextJs / TypeScript",
  AUTHOR: {
    NAME: "Fernando Luis Barrios Alarcón",
    HANDLE: "fernandolba",
    URL: "https://fernandolba.com",
    PHOTO: `${appRoutes.IMAGES.BASE}/profile-pic.jpeg`,
    SUMMARY:
      "Desarrollador frontend especializado en React.js, Next.js y TypeScript, con experiencia backend en Node.js, Express.js y NestJS. Cuento con 6+ años de experiencia, y en los últimos 4 años he trabajado en proyectos de consultoría para clientes enterprise de los sectores seguros (Rimac Seguros), logística aérea (UASL Chile) y construcción (Cementos Pacasmayo), colaborando con equipos en Perú, Chile, Colombia, Uruguay y Argentina. He coordinado equipos frontend de hasta 5 desarrolladores, mejorado el rendimiento de aplicaciones mediante refactoring, code splitting y lazy loading, y participado en la migración de una arquitectura de microfrontends a Vite y TypeScript. El proyecto de pagos en el que trabajé en Softtek recibió el premio Voice of the Customer (VOC). Disponible para roles remotos como Frontend Senior o Full Stack.",
  },
  REPO_URL: "https://github.com/FernandoLBA/flba-next-commerce",
  CHALLENGE_VIDEO_ID: "DsfW5ZwCddE",
  CURRENCY: {
    CODE: "PEN",
    SYMBOL: "S/",
  },
  PRODUCTS_LIMIT: 20,
  CATEGORIES_LIMIT: 8,
};
