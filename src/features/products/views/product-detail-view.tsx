import { AddToCartButton } from "@/features/cart";
import { AppBadge } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { addPercentage } from "@/shared/utils/percentage";
import { appSettings } from "../../../shared/constants/app.settings";
import { ProductGallery } from "../components/product-gallery/product-gallery";
import { ProductReviews } from "../components/product-reviews/product-reviews";
import { ProductStars } from "../components/product-stars/product-stars";
import type { Product } from "../types/product.types";

export const ProductDetailView = ({ product }: { product: Product }) => {
  const { PRODUCT_DETAIL: text, COMMON } = appMessages;
  const outOfStock = product.stock <= 0;

  const images = product.images.length ? product.images : [product.thumbnail];

  const details = [
    { label: text.SHIPPING, value: product.shippingInformation },
    { label: text.WARRANTY, value: product.warrantyInformation },
  ].filter((detail) => detail.value);

  return (
    <article className="mx-auto flex w-full max-w-7xl flex-col gap-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* IMÁGENES */}
        <ProductGallery images={images} title={product.title} />

        {/* DETALLES DEL PRODUCTO */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="typo-caption uppercase text-muted">
              {product.brand ?? COMMON.NO_BRAND}
            </p>

            <h1 className="typo-title">{product.title}</h1>

            <div className="flex items-center gap-2">
              <ProductStars value={product.rating} />
              <span className="typo-body-sm text-muted">
                ({product.reviews.length} {text.REVIEWS.toLowerCase()})
              </span>
            </div>
          </div>

          {/* PRECIOS */}
          <div className="flex items-center gap-4">
            <p className="typo-title">
              <span className="font-bold typo-currency">
                {appSettings.CURRENCY.SYMBOL}
              </span>
              {`${product.price}`}
            </p>

            <p className="typo-price-old line-through text-destructive">
              <span className="typo-currency">
                {appSettings.CURRENCY.SYMBOL}
              </span>
              {addPercentage(product.price, product.discountPercentage)}
            </p>

            <AppBadge variant="destructive">
              -{product.discountPercentage}%
            </AppBadge>
          </div>

          {/* STOCK */}
          {outOfStock && (
            <AppBadge className="w-fit" variant="destructive">
              {appMessages.PRODUCT_DETAIL.OUT_OF_STOCK}
            </AppBadge>
          )}

          {/* DESCRIPCIÓN */}
          <p className="typo-body">{product.description}</p>

          {/* AGREGAR AL CARRITO */}
          <AddToCartButton
            item={{
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              stock: product.stock,
            }}
          />

          {/* ENVÍO Y GARANTIA */}
          {details.length > 0 && (
            <dl className="grid gap-3 sm:grid-cols-2">
              {details.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-md border border-border p-3"
                >
                  <dt className="typo-caption uppercase text-muted">{label}</dt>
                  <dd className="typo-body-sm">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <ProductReviews reviews={product.reviews} />
    </article>
  );
};
