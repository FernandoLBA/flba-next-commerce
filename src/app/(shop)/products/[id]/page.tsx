import { getProductById } from "@/features/products";
import { appRoutes } from "@/shared/constants/app.routes";
import { appSettings } from "@/shared/constants/app.settings";
import { truncate } from "@/shared/utils/truncate";
import { Metadata } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";
import { cache } from "react";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export const getProductByIdOrNotFound = cache(async (id: string) => {
  try {
    const product = await getProductById(id);

    return product;
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) notFound();

    throw error;
  }
});

export const generateMetadata = async ({
  params,
}: ProductDetailsPageProps): Promise<Metadata> => {
  const { id } = await params;
  const product = await getProductByIdOrNotFound(id);
  const url = `${appRoutes.PRODUCTS.BASE}/${product.id}`;

  const description =
    truncate(product.description) || appSettings.APP_DESCRIPTION;

  const images = [
    ...new Set([product.images[0], product.thumbnail].filter(Boolean)),
  ].map((src) => ({ url: src, alt: product.title }));

  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: appSettings.APP_NAME,
      locale: "es_ES",
      url,
      title: product.title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: images.map((img) => img.url),
    },
  };
};

const ProductDetailsPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const product = await getProductByIdOrNotFound(id);

  return <>Product Details {product.title}</>;
};

export default ProductDetailsPage;
