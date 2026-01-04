import * as accurateClient from '#services/accurate/client';
import asyncHandler from '#utils/async-handler';
import {getApiHost} from "#services/accurate/client";

export const syncProduct = asyncHandler(async (req, res, next) => {
  const data = await accurateClient.getItemList();

  return res.status(200).json({
    success: true,
    data: data
  });
});
