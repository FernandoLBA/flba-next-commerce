import { serverEnvs } from "@/shared/config/envs.server";
import { appSettings } from "@/shared/lib";
import { QueryProvider } from "@/shared/providers/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = (): Metadata => {
  return {
    title: {
      template: `%s | ${appSettings.APP_NAME}`,
      default: appSettings.APP_NAME,
    },
    description: appSettings.APP_DESCRIPTION,
    metadataBase: new URL(serverEnvs.APP_SERVER_URL),
  };
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
