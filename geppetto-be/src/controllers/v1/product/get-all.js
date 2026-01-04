import * as getProductService from '#services/product/get';
import asyncHandler from '#utils/async-handler';

export const getProducts = asyncHandler(async (req, res, next) => {
  const responseDTO = await getProductService.getAll();

  return res.status(200).json({
    success: true,
    data: responseDTO
  });
});
