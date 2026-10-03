import { getProductsService } from "./services";

export const ProductsFeaturePage = async () => {
  const products = await getProductsService({});
  console.log(
    "🚀 ~ ProductsFeaturePage ~ products:",
    products.data.data[0].thumbnail,
  );

  return <>Products Feature</>;
};
