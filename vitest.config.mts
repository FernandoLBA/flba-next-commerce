import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true, // alias "@/..." del tsconfig
    alias: {
      // `server-only` lanza un error fuera de Next; en los tests es un módulo vacío.
      "server-only": fileURLToPath(new URL("./vitest/server-only.ts", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest/setup.tsx"],
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
    // Las variables que valida zod al importar los módulos de config.
    env: {
      NEXT_PUBLIC_API_URL: "https://dummyjson.com",
      APP_SERVER_URL: "http://localhost:3000",
    },
  },
});
