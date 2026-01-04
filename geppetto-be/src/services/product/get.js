import * as productQueries from '#queries/product';

export const getAll = async () => {
  const products = await productQueries.findAllActiveProducts();

  return products;
};
