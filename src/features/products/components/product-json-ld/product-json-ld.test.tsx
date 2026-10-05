import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Product } from "../../types/product.types";
import { ProductJsonLd } from "./product-json-ld";

const product = {
  id: 30,
  title: "Key Holder",
  description: "Metallic key holder",
  category: "home-decoration",
  brand: "Golden",
  price: 30,
  discountPercentage: 2.9,
  rating: 4.9,
  stock: 54,
  images: ["https://cdn.dummyjson.com/1.jpg"],
  thumbnail: "https://cdn.dummyjson.com/t.jpg",
} as Product;

const url = "https://tienda.test/products/30";

const readJsonLd = (container: HTMLElement) => {
  const script = container.querySelector('script[type="application/ld+json"]');

  return { script, data: JSON.parse(script?.textContent ?? "{}") };
};

describe("ProductJsonLd", () => {
  it("describe el producto con schema.org", () => {
    const { container } = render(<ProductJsonLd product={product} url={url} />);
    const { data } = readJsonLd(container);

    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Key Holder",
      sku: "30",
      brand: { "@type": "Brand", name: "Golden" },
      offers: {
        "@type": "Offer",
        url,
        price: 30,
        priceCurrency: "PEN",
        availability: "https://schema.org/InStock",
      },
    });
  });

  it("marca el producto como agotado sin stock", () => {
    const { container } = render(
      <ProductJsonLd product={{ ...product, stock: 0 }} url={url} />,
    );

    expect(readJsonLd(container).data.offers.availability).toBe(
      "https://schema.org/OutOfStock",
    );
  });

  it("no emite una marca vacía cuando el producto no tiene marca", () => {
    const { container } = render(
      <ProductJsonLd product={{ ...product, brand: undefined }} url={url} />,
    );

    expect(readJsonLd(container).data).not.toHaveProperty("brand");
  });

  it("escapa «<» para que el contenido de la API no cierre el script", () => {
    const { container } = render(
      <ProductJsonLd
        product={{ ...product, title: "</script><b>x</b>" }}
        url={url}
      />,
    );
    const { script, data } = readJsonLd(container);

    expect(script?.innerHTML).not.toContain("</script>");
    expect(script?.innerHTML).toContain("\\u003c");
    expect(data.name).toBe("</script><b>x</b>");
  });
});
