import { AddToCartButton } from "@/features/cart";
import {
  AppBadge,
  AppLink,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
} from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appRoutes } from "@/shared/constants/app.routes";
import { appSettings } from "@/shared/constants/app.settings";
import { addPercentage } from "@/shared/utils/percentage";
import { truncate } from "@/shared/utils/truncate";
import Image from "next/image";
import { Product } from "../../types/product.types";
import { ProductStars } from "../product-stars/product-stars";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const productImage =
    product.thumbnail ?? `${appRoutes.IMAGES.BASE}/parfum-men.jpg`;

  return (
    <Card>
      <AppLink
        href={`${appRoutes.PRODUCTS.BASE}/${product.id}`}
        className="block"
      >
        <CardMedia className="relative">
          <Image
            className="object-cover"
            src={productImage}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            loading="eager"
          />

          <AppBadge className="absolute top-2 right-2" variant="destructive">
            - {product.discountPercentage.toFixed(1)}%
          </AppBadge>
        </CardMedia>
      </AppLink>

      <CardContent>
        <CardDescription>
          {product.brand ?? appMessages.COMMON.NO_BRAND}
        </CardDescription>
        <CardTitle className="text-foreground">
          {truncate(product.title, 25)}
        </CardTitle>
      </CardContent>

      <CardFooter>
        <div className="flex-x-between px-4">
          <ProductStars value={product.rating} />

          <div className=" px-3 py-2 md:px-0">
            <p className="text-xs line-through md:typo-price-old text-destructive">
              {`${appSettings.CURRENCY.SYMBOL} ${addPercentage(product.price, product.discountPercentage)}`}
            </p>

            <p className="typo-price">
              <span className="typo-currency">
                {appSettings.CURRENCY.SYMBOL}
              </span>
              {` ${product.price.toFixed(2)}`}
            </p>
          </div>
        </div>

        <AddToCartButton
          className="w-full"
          item={{
            ...product,
          }}
        />
      </CardFooter>
    </Card>
  );
};
