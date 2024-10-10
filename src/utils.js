function buildHeaders(apiKey) {
    const headers = {};
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    return headers;
  }
  
  function buildQueryParams(params = {}, apiKey, apiKeyFromParam = false) {
    if (apiKeyFromParam && apiKey) {
      return { ...params, api_key: apiKey };
    }
    return params;
  }
  
  function handleError(error) {
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
  
  module.exports = {
    buildHeaders,
    buildQueryParams,
    handleError,
  };
  