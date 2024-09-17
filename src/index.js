const axios = require('axios');

const BASE_URL = 'https://api.autoresbot.com';

class ApiAutoresbot {
  constructor(apiKey = null) {
    this.apiKey = apiKey
  }

  async get(endpoint, params = {}, apiKeyFromParam = false) {
    try {
      let headers = {};
      let queryParams = { ...params };

      if (apiKeyFromParam) {
        queryParams['api_key'] = this.apiKey;
      } else {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: headers,
        params: queryParams,  // Menambahkan query parameter
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
}

module.exports = ApiAutoresbot;
