import { Footer, Header } from "@/shared/components";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20 px-5">{children}</main>

      <Footer />
    </div>
  );
}
