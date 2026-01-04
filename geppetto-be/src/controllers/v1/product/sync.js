import * as accurateClient from '#services/accurate/client';
import asyncHandler from '#utils/async-handler';

export const syncProduct = asyncHandler(async (req, res, next) => {
  const response = await accurateClient.getApiToken();

  const simplifiedResponse = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    data: response.data
  };

  return res.status(200).json({
    success: true,
    data: simplifiedResponse
  });
});
