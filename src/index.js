const axios = require('axios');

const BASE_URL = 'https://api.autoresbot.com';

class ApiAutoresbot {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
  }

  // Metode untuk membangun header
  buildHeaders() {
    const headers = {};
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    return headers;
  }

  // Metode untuk membangun query parameters
  buildQueryParams(params = {}, apiKeyFromParam = false) {
    if (apiKeyFromParam && this.apiKey) {
      return { ...params, api_key: this.apiKey };
    }
    return params;
  }

  async get(endpoint, params = {}, apiKeyFromParam = false) {
    try {
      const headers = this.buildHeaders();
      const queryParams = this.buildQueryParams(params, apiKeyFromParam);

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers,
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Metode untuk menangani error
  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || error.response.data.error || 'Unknown error';

      switch (status) {
        case 400:
          throw new Error(`Bad Request: ${message}`);
        case 401:
          throw new Error(`Unauthorized: ${message}`);
        case 403:
          throw new Error('Forbidden: Access denied. Check your API key or permissions.');
        case 404:
          throw new Error('Not Found: Endpoint not found.');
        case 429:
          throw new Error(`Too Many Requests: ${message}`);
        case 500:
          throw new Error('Internal Server Error: The server encountered an error.');
        default:
          throw new Error(`Unexpected error: ${status} - ${message}`);
      }
    } else if (error.request) {
      throw new Error('No response received from the server.');
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}

module.exports = ApiAutoresbot;
