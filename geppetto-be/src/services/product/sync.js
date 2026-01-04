import * as accurateClient from '#services/accurate/client';
import * as productQueries from '#queries/product';
import logger from '#utils/logger';

const fetchAllProductsFromAccurate = async () => {
  let currentPage = 1;
  let hasNextPage = true;
  const products = [];

  while (hasNextPage) {
    const response = await accurateClient.getItemList({
      page: currentPage
    });

    const items = response.d || [];
    const { pageCount } = response.sp || {};

    products.push(...items);

    logger.info(`[Sync Product] Fetch data from accurate. Page ${currentPage} of ${pageCount}`);

    if (currentPage >= pageCount || items.length === 0) {
      hasNextPage = false;
    } else {
      currentPage++;

      // Add delay to avoid rate limit from Accurate
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }

  return products;
};

export const runSync = async () => {
  const productsFromAccurate = await fetchAllProductsFromAccurate();

  return productsFromAccurate;
};
