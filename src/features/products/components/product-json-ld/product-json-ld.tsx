import { appSettings } from "@/shared/constants/app.settings";
import { Product } from "../../types/product.types";

type ProductJsonLdProps = { product: Product; url: string };

export const ProductJsonLd = ({ product, url }: ProductJsonLdProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    sku: String(product.id),
    category: product.category,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: appSettings.CURRENCY.CODE,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      //* Se escapa "<" para que el contenido de la API no pueda cerrar el <script>.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};
