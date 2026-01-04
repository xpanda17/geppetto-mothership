import axios from 'axios';
import CryptoJS from 'crypto-js';

const BASE_URL = process.env.ACCURATE_API_URL;
const SIGNATURE_SECRET = process.env.ACCURATE_SIGNATURE_SECRET;
const API_TOKEN = process.env.ACCURATE_API_TOKEN;

const TIMEOUT_IN_MS = 5000;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_IN_MS,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
  try {
    const response = await apiClient.post(
        '/api-token.do',
        {},
        { headers: buildAuthHeaders() }
    );

    return response;
  } catch (error) {
    console.error('Error fetching database host:', error.response?.data || error.message);
    throw error;
  }
};
