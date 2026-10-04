import { PageShell } from "@/shared/components/layout/page-shell/page-shell";
import { AppLink, StatusMessage } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appRoutes } from "@/shared/constants/app.routes";
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: appMessages.NOT_FOUND_PAGE.TITLE,
  };
};

export default function NotFoundPage() {
  return (
    <PageShell>
      <StatusMessage
        code={appMessages.NOT_FOUND_PAGE.CODE}
        title={appMessages.NOT_FOUND_PAGE.TITLE}
        description={appMessages.NOT_FOUND_PAGE.DESCRIPTION}
        actions={
          <>
            <AppLink
              href={appRoutes.HOME.BASE}
              className="rounded-md bg-primary px-6 py-2 text-primary-foreground"
            >
              {appMessages.NOT_FOUND_PAGE.BACK_HOME_BUTTON}
            </AppLink>

            <AppLink
              href={appRoutes.PRODUCTS.BASE}
              className="px-6 py-2 text-primary-text"
            >
              {appMessages.NOT_FOUND_PAGE.PRODUCTS_BUTTON}
            </AppLink>
          </>
        }
      />
    </PageShell>
  );
}
