import Product from '#models/Product';

export const findAllActiveProducts = () => {
  return Product.findAll({
    where: {
      active: true
    },
  });
};

export const findByAccurateProductId = (accurateProductId) => {
  return Product.findOne({
    where: { accurateProductId }
  });
};

export const findByProductNumber = (productNumber) => {
  return Product.findOne({
    where: { productNumber }
  });
};

export const upsert = async (productData) => {
  const [product, created] = await Product.upsert(productData, {
    returning: true
  });
  return product;
};
