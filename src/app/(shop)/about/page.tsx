import { AboutView } from "@/features/about";
import { appMessages } from "@/shared/constants/app.messages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: appMessages.ABOUT.TITLE,
  description: appMessages.ABOUT.INTRO,
};

export default function AboutPage() {
  return <AboutView />;
}
