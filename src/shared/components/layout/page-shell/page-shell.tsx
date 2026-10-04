import type { ReactNode } from "react";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <Header />

    <main className="flex-1 px-5 pt-20">{children}</main>

    <Footer />
  </div>
);
