import type { ReactNode } from "react";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="flex-y-between min-h-screen">
    <Header />

    <main className="flex-1 px-5 py-20">{children}</main>

    <Footer />
  </div>
);
