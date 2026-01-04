import _ from 'lodash';
import pLimit from 'p-limit';

import sequelize from '#config/db';
import * as accurateClient from '#services/accurate/client';
import * as productQueries from '#queries/product';
import logger from '#utils/logger';

const UPSERT_CONCURRENCY_LIMIT = 10;
const DELAY_FOR_ACCURATE_IN_MS = 150;

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
      logger.info('A');
      hasNextPage = false;
    } else {
      logger.info('B');
      currentPage++;
      logger.info(currentPage);

      // Add delay to avoid rate limit from Accurate
      await new Promise(resolve => setTimeout(resolve, DELAY_FOR_ACCURATE_IN_MS));
    }
  }

  return products;
};

const mapAccurateItemToProduct = (item) => {
  return {
    accurateProductId: item.id.toString(),
    productNumber: item.no,
    name: item.name,
    itemType: item.itemType,
    sellingPrice: item.unitPrice || 0,
    basePrice: item.vendorPrice || 0,
    quantity: Math.floor(item.availableToSell || 0),
    active: !item.suspended,
  };
};

const bulkUpsert = async (products) => {
  const limit = pLimit(UPSERT_CONCURRENCY_LIMIT);

  await sequelize.transaction(async (transaction) => {
    const promises = products.map((product) =>
        limit(() =>
            productQueries.upsert(product, {
              transaction: transaction
            })
        )
    );

    await Promise.all(promises);
  });
};

export const runSync = async () => {
  const productsFromAccurate = await fetchAllProductsFromAccurate();

  const dbProducts = _.map(productsFromAccurate, mapAccurateItemToProduct);

  try {
    await bulkUpsert(dbProducts);
    logger.info('[Sync Product] Sync completed successfully.');
  } catch (error) {
    logger.error(`[Sync Product] Sync failed: ${error.message}`);
    throw error;
  }

  return dbProducts;
};
