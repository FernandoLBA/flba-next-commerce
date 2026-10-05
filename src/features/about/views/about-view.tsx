import { AppLink } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appSettings } from "@/shared/constants/app.settings";
import { ExternalLink } from "lucide-react";
import { ProfileCard } from "../components/profile-card/profile-card";
import { ReadmeContent } from "../components/readme-content/readme-content";
import { YoutubeEmbed } from "../components/youtube-embed/youtube-embed";

export const AboutView = () => {
  const text = appMessages.ABOUT;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="typo-title">{text.TITLE}</h1>
        <p className="typo-body text-muted">{text.INTRO}</p>
      </header>

      <ProfileCard />

      <section
        aria-labelledby="about-video-title"
        className="flex flex-col gap-4"
      >
        <h2 id="about-video-title" className="typo-subtitle">
          {text.VIDEO_TITLE}
        </h2>

        <YoutubeEmbed
          videoId={appSettings.CHALLENGE_VIDEO_ID}
          title={text.VIDEO_IFRAME_TITLE}
          fallback={text.VIDEO_SOON}
        />
        <p className="typo-body-sm md:typo-body text-muted">
          <b>IMPORTANTE:</b> Hubo problemas técnicos con las herramientas de
          grabación del video
        </p>
      </section>

      <section
        aria-labelledby="about-repo-title"
        className="flex flex-col items-start gap-3 rounded-lg border border-border p-6"
      >
        <h2 id="about-repo-title" className="typo-subtitle">
          {text.REPO_TITLE}
        </h2>
        <p className="typo-body text-muted">{text.REPO_DESCRIPTION}</p>

        <div className="flex flex-wrap gap-3">
          <AppLink
            variant="button"
            href={appSettings.REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text.REPO_CTA}
            <ExternalLink aria-hidden className="ml-2 size-4" />
          </AppLink>

          <AppLink
            variant="outline"
            href={appSettings.DEPLOY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text.DEMO_CTA}
            <ExternalLink aria-hidden className="ml-2 size-4" />
          </AppLink>
        </div>
      </section>

      <section
        aria-labelledby="about-readme-title"
        className="flex flex-col gap-4"
      >
        <h2 id="about-readme-title" className="typo-subtitle">
          {text.README_TITLE}
        </h2>

        <ReadmeContent />
      </section>
    </div>
  );
};
