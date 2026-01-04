import axios from 'axios';
import CryptoJS from 'crypto-js';

import { AccurateError } from '#errors/accurrate-error';

const SIGNATURE_SECRET = process.env.ACCURATE_SIGNATURE_SECRET;
const API_TOKEN = process.env.ACCURATE_API_TOKEN;

const TIMEOUT_IN_MS = 5000;

const apiClient = axios.create({
  timeout: TIMEOUT_IN_MS,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
    (response) => {
      if (response.data && response.data.s === false) {
        throw new AccurateError(response);
      }

      return response;
    },
    (error) => {
      if (error.response) {
        throw new AccurateError(error.response);
      }

      throw error;
    }
);

const buildAuthHeaders = () => {
  const timestamp = new Date().toISOString();
  const hash = CryptoJS.HmacSHA256(timestamp, SIGNATURE_SECRET);
  const signature = CryptoJS.enc.Base64.stringify(hash);

  return {
    'Authorization': `Bearer ${API_TOKEN}`,
    'X-Api-Timestamp': timestamp,
    'X-Api-Signature': signature
  };
};

export const getApiToken = async () => {
  const response = await apiClient.post(
      `https://account.accurate.id/api/api-token.do`,
      {},
      { headers: buildAuthHeaders() }
  );

  return response;
};
