import Product from '#models/Product';

export const findAllActiveProducts = (criteria) => {
  return Product.findAll({
    where: {
      ...criteria,
      active: true
    },
    order: [['name', 'ASC']]
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

export const upsert = async (productData, options = {}) => {
  const [product, created] = await Product.upsert(productData, {
    returning: true,
    ...options
  });

  return product;
};
