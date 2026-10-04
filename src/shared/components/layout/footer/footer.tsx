import { AppLink } from "@/shared/components/ui";
import { appRoutes } from "@/shared/constants/app.routes";
import { appSettings } from "@/shared/constants/app.settings";
import { Code } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-black text-primary">
      <div className="flex flex-col items-center gap-3 px-6 py-6 text-sm md:flex-row md:justify-between">
        {/* Marca */}
        <AppLink
          href={appRoutes.HOME.BASE}
          aria-label={`${appSettings.APP_NAME} - Inicio`}
        >
          <div className="flex items-center gap-1">
            <Code />

            <span>{appSettings.APP_NAME}</span>
          </div>
        </AppLink>

        <p>
          © {year} {appSettings.APP_NAME}. Todos los derechos reservados.
        </p>

        <p>
          Hecho por:{" "}
          <a
            href={appSettings.AUTHOR.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:font-bold"
          >
            {appSettings.AUTHOR.NAME}
          </a>
        </p>
      </div>
    </footer>
  );
};
