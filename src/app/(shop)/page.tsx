import { getCategories, getProducts, ProductList } from "@/features/products";
import {
  AppLink,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appRoutes } from "@/shared/constants/app.routes";
import { appSettings } from "@/shared/constants/app.settings";
import { Metadata } from "next";
import Image from "next/image";
import ProductListingPage from "./products/page";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Bienvenido",
  };
};

export default async function Home(props: ProductListingPage) {
  const filters = await props.searchParams;
  const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
  const res = await getProducts({ ...filters, page });
  const categories = await getCategories();

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10">
      <h1 className="sr-only">{appSettings.APP_NAME}</h1>

      <div className="relative h-56 overflow-hidden rounded-md md:h-100">
        <AppLink href={appRoutes.PRODUCTS.BASE} className="block h-full w-full">
          <Image
            className="object-cover"
            src="https://images.pexels.com/photos/6214365/pexels-photo-6214365.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt={appMessages.HOME.BANNER_ALT}
            fill
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
        </AppLink>
      </div>

      <ProductList products={res.products} />

      <AppLink
        variant="outline"
        className="self-center"
        href={appRoutes.PRODUCTS.BASE}
      >
        Ir a productos
      </AppLink>

      <div className="flex-y-between gap-8 bg-primary dark:bg-black p-6 rounded-md">
        <h2 className="typo-subtitle text-foreground">Categorías</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
          {categories.map((category) => (
            <AppLink
              key={category.slug}
              href={appRoutes.PRODUCTS.byCategory(category.slug)}
            >
              <Card className="bg-white">
                <CardContent>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.slug}</CardDescription>
                </CardContent>
              </Card>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}
