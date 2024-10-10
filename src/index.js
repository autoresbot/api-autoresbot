const axios = require('axios');
const { handleError, buildHeaders, buildQueryParams } = require('./utils');

const BASE_URL = 'https://api.autoresbot.com';

class ApiAutoresbot {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
  }

  async get(endpoint, params = {}, apiKeyFromParam = false) {
    try {
      const headers = buildHeaders(this.apiKey);
      const queryParams = buildQueryParams(params, this.apiKey, apiKeyFromParam);

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers,
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async post(endpoint, data = {}, apiKeyFromParam = false) {
    try {
      const headers = buildHeaders(this.apiKey);
      const queryParams = buildQueryParams({}, this.apiKey, apiKeyFromParam);

      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        headers,
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  // Kamu bisa tambahkan metode lain seperti PUT, DELETE, dll.
}

module.exports = ApiAutoresbot;
