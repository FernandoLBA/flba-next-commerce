import { getCategories } from "@/features/products";
import { PageShell } from "@/shared/components/layout/page-shell/page-shell";
import { CategoriesProvider } from "@/shared/providers/categories-provider";
import { Category } from "@/shared/types/category.type";

export default async function ShopLayout({ children }: LayoutProps<"/">) {
  const categories = await getCategories().catch((): Category[] => []);

  return (
    <CategoriesProvider categories={categories}>
      <PageShell>{children}</PageShell>
    </CategoriesProvider>
  );
}
