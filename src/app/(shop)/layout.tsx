import { Footer } from "@/shared/components/layout/footer/footer";
import { Header } from "@/shared/components/layout/header/header";

export default async function ShopLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20 px-5">{children}</main>

      <Footer />
    </div>
  );
}
