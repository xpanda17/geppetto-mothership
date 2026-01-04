import * as syncProductService from '#services/product/sync';
import asyncHandler from '#utils/async-handler';

export const syncProduct = asyncHandler(async (req, res, next) => {
  const result = await syncProductService.runSync();

  return res.status(200).json({
    success: true,
    data: result,
  });
});
