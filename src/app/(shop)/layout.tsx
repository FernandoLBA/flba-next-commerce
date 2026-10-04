import { PageShell } from "@/shared/components/layout/page-shell/page-shell";

export default function ShopLayout({ children }: LayoutProps<"/">) {
  return <PageShell>{children}</PageShell>;
}
