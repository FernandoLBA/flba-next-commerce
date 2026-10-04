"use client";

import { AppButton, AppLink, StatusMessage } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appRoutes } from "@/shared/constants/app.routes";
import { TriangleAlert } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  return (
    <StatusMessage
      role={appMessages.ERROR_PAGE.ROLE}
      icon={<TriangleAlert aria-hidden className="size-16 text-destructive" />}
      title={appMessages.ERROR_PAGE.TITLE}
      description={appMessages.ERROR_PAGE.DESCRIPTION}
      actions={
        <>
          <AppButton onClick={() => retry()}>
            {appMessages.ERROR_PAGE.RETRY_BUTTON}
          </AppButton>

          <AppLink
            href={appRoutes.HOME.BASE}
            className="px-6 py-2 text-primary-text"
          >
            {appMessages.ERROR_PAGE.BACK_HOME_BUTTON}
          </AppLink>
        </>
      }
    >
      {error.digest && (
        <p className="text-xs text-muted">{`${appMessages.ERROR_PAGE.REFERENCE} ${error.digest}`}</p>
      )}
    </StatusMessage>
  );
}
