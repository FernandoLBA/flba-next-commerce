const ProductDetailsPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  return <>Product Details {id}</>;
};

export default ProductDetailsPage;
