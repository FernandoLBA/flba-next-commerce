import { AppLink } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appSettings } from "@/shared/constants/app.settings";
import { ExternalLink, User } from "lucide-react";
import Image from "next/image";

export const ProfileCard = () => {
  const { AUTHOR } = appSettings;
  const text = appMessages.ABOUT;

  return (
    <section
      aria-labelledby="about-profile-title"
      className="flex flex-col items-center md:items-start gap-6 rounded-lg border border-border p-6 text-center md:flex-row md:text-left"
    >
      <div className="relative size-36 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
        {AUTHOR.PHOTO ? (
          <Image
            className="object-cover"
            src={AUTHOR.PHOTO}
            alt={text.PHOTO_ALT}
            fill
            priority
            sizes="144px"
          />
        ) : (
          <User aria-hidden className="m-auto size-full p-8 text-muted" />
        )}
      </div>

      <div className="flex flex-col items-center gap-3 md:items-start">
        <div>
          <h2 id="about-profile-title" className="typo-subtitle">
            {text.PROFILE_TITLE}
          </h2>
          <p className="typo-body-sm text-muted">{AUTHOR.NAME}</p>
        </div>

        <p className="typo-body max-w-prose">{AUTHOR.SUMMARY}</p>

        <AppLink
          variant="outline"
          href={AUTHOR.URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text.PORTFOLIO_CTA}
          <ExternalLink aria-hidden className="ml-2 size-4" />
        </AppLink>
      </div>
    </section>
  );
};
