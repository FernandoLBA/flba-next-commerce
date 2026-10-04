import {
  AppButton,
  AppLink,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
} from "@/shared/components/ui";
import { appRoutes } from "@/shared/constants/app.routes";
import { appSettings } from "@/shared/constants/app.settings";
import { truncate } from "@/shared/utils/truncate";
import Image from "next/image";
import { Product } from "../../types/product.types";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const fallbackImage = `${appRoutes.IMAGES.BASE}/parfum-men.jpg`;

  return (
    <Card>
      <AppLink
        href={`${appRoutes.PRODUCTS.BASE}/${product.id}`}
        className="block"
      >
        <CardMedia>
          <Image
            className="object-cover"
            src={fallbackImage}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            loading="eager"
          />
        </CardMedia>
      </AppLink>

      <CardContent>
        <CardDescription>{product.brand}</CardDescription>
        <CardTitle className="text-sm">{truncate(product.title, 25)}</CardTitle>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-between px-3 py-2 md:px-4">
          <p className="text-red-500 line-through">
            {`${appSettings.CURRENCY.SYMBOL} ${(product.price + product.price * 0.3).toFixed(2)}`}
          </p>

          <p className="text-lg">
            <span className="align-super text-xs">
              {appSettings.CURRENCY.SYMBOL}
            </span>
            {` ${product.price.toFixed(2)}`}
          </p>
        </div>

        <AppButton className="w-full rounded-none">Agregar al carro</AppButton>
      </CardFooter>
    </Card>
  );
};
