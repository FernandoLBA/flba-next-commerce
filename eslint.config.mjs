import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const noApp = {
  group: ["@/app/**"],
  message: "Nada fuera de app/ puede importar de app/.",
};

const noFeatures = {
  group: ["@/features/**"],
  message: "shared/ no puede depender de features/.",
};

const noFeatureInternals = {
  group: ["@/features/*/*"],
  message:
    "Importa solo desde la frontera pública de la feature (@/features/<feature>).",
};

const noLayout = {
  group: ["@/shared/components/layout/**"],
  message: "shared/components/ui no puede depender de layout.",
};

const restrict = (...patterns) => ({
  "no-restricted-imports": ["error", { patterns }],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: restrict(noApp, noFeatures),
  },
  {
    files: ["src/shared/components/ui/**/*.{ts,tsx}"],
    rules: restrict(noApp, noFeatures, noLayout),
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: restrict(noApp, noFeatureInternals),
  },
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: restrict(noFeatureInternals),
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
