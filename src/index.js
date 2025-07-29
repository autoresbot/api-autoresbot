const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { handleError, buildHeaders, buildQueryParams } = require('./utils');

const BASE_URL = 'https://api.autoresbot.com'; // http://localhost:3000 https://api.autoresbot.com
const BASE_UPLOADER = 'https://autoresbot.com'; // https://autoresbot.com

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

  // Fungsi baru: Mengambil data JSON
  async getJson(endpoint, params = {}, apiKeyFromParam = false) {
    try {
      const headers = buildHeaders(this.apiKey);
      const queryParams = buildQueryParams(params, this.apiKey, apiKeyFromParam);

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers,
        params: queryParams,
        responseType: 'json'
      });

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  // Fungsi baru: Mengambil buffer dari endpoint (misalnya untuk file biner)
  async getBuffer(endpoint, params = {}, apiKeyFromParam = false) {
    try {
      const headers = buildHeaders(this.apiKey);
      const queryParams = buildQueryParams(params, this.apiKey, apiKeyFromParam);

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers,
        params: queryParams,
        responseType: 'arraybuffer'
      });

      return Buffer.from(response.data);
    } catch (error) {
      handleError(error);
    }
  }

  // Fungsi baru: Mengupload file sementara
  async tmpUpload(filePath) {
    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));

      const headers = {
        ...form.getHeaders()
      };

      const response = await axios.post(`${BASE_UPLOADER}/tmp-files/upload`, form, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.log(error)
      handleError(error);
    }
  }
}

module.exports = ApiAutoresbot;
