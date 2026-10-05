import {
  getProductById,
  ProductDetailView,
  ProductJsonLd,
} from "@/features/products";
import { ApiError } from "@/shared/api/errors";
import { serverEnvs } from "@/shared/config/envs.server";
import { appRoutes } from "@/shared/constants/app.routes";
import { appSettings } from "@/shared/constants/app.settings";
import { truncate } from "@/shared/utils/truncate";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const getProductByIdOrNotFound = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) notFound();

  try {
    return await getProductById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();

    throw error;
  }
});

export const generateMetadata = async ({
  params,
}: ProductDetailsPageProps): Promise<Metadata> => {
  const { id } = await params;
  const product = await getProductByIdOrNotFound(id);
  const url = appRoutes.PRODUCTS.byId(String(product.id));

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
  
  const url = new URL(
    appRoutes.PRODUCTS.byId(String(product.id)),
    serverEnvs.APP_SERVER_URL,
  ).toString();

  return (
    <>
      <ProductJsonLd product={product} url={url} />

      <ProductDetailView product={product} />
    </>
  );
};

export default ProductDetailsPage;
