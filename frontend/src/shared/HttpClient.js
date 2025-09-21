/**
 * @class HttpClient
 * @classdesc A base HTTP client to send requests (GET, POST, PUT, DELETE) with
 *             common headers (e.g., JSON content type and Bearer token authorization).
 */
export default class HttpClient {
  /**
   * Creates an instance of HttpClient.
   * @param {string} [baseURL=''] - The base URL to prefix to all request paths.
   */
  constructor(baseURL = '') {
    /**
     * @private
     * @type {string}
     */
    this.baseURL = baseURL;
  }

  /**
   * Builds the full URL by concatenating the base URL and a relative path.
   *
   * @private
   * @param {string} url - The relative path or endpoint to request.
   * @returns {string} The concatenated full URL.
   */
  _buildUrl(url) {
    // Ensure no double slashes if baseURL ends with "/" or url starts with "/"
    if (this.baseURL.endsWith('/') && url.startsWith('/')) {
      return `${this.baseURL.slice(0, -1)}${url}`;
    }
    if (!this.baseURL.endsWith('/') && !url.startsWith('/')) {
      return `${this.baseURL}/${url}`;
    }
    return `${this.baseURL}${url}`;
  }

  /**
   * Retrieves headers for the request, including Content-Type and Authorization if a token exists.
   *
   * @private
   * @returns {Object.<string, string>} An object containing HTTP headers.
   */
  _getHeaders() {
    // Default headers
    const headers = {
      'Content-Type': 'application/json',
    };

    // First token key (e.g., for compatibility or migration)
    const oldToken = localStorage.getItem('auth-token');
    // Current token key (preferred)
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (oldToken) {
      headers['Authorization'] = `Bearer ${oldToken}`;
    }

    return headers;
  }

  /**
   * Sends a GET request to the specified endpoint.
   *
   * @param {string} url - The endpoint path (relative to baseURL).
   * @param {Object} [config={}] - Optional fetch configuration overrides.
   * @param {Object.<string, string>} [config.headers] - Additional headers to merge.
   * @returns {Promise<{ok: boolean, data?: any, error?: string}>} The response wrapper matching backend structure.
   */
  async get(url, config = {}) {
    return this._request(this._buildUrl(url), {
      method: 'GET',
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  /**
   * Sends a POST request to the specified endpoint with a JSON body.
   *
   * @param {string} url - The endpoint path (relative to baseURL).
   * @param {Object} [data={}] - The payload to send as JSON.
   * @param {Object} [config={}] - Optional fetch configuration overrides.
   * @param {Object.<string, string>} [config.headers] - Additional headers to merge.
   * @returns {Promise<{ok: boolean, data?: any, error?: string}>} The response wrapper matching backend structure.
   */
  async post(url, data = {}, config = {}) {
    return this._request(this._buildUrl(url), {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  /**
   * Sends a PUT request to the specified endpoint with a JSON body.
   *
   * @param {string} url - The endpoint path (relative to baseURL).
   * @param {Object} [data={}] - The payload to send as JSON.
   * @param {Object} [config={}] - Optional fetch configuration overrides.
   * @param {Object.<string, string>} [config.headers] - Additional headers to merge.
   * @returns {Promise<{ok: boolean, data?: any, error?: string}>} The response wrapper matching backend structure.
   */
  async put(url, data = {}, config = {}) {
    return this._request(this._buildUrl(url), {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @param {string} url - The endpoint path (relative to baseURL).
   * @param {Object} [config={}] - Optional fetch configuration overrides.
   * @param {Object.<string, string>} [config.headers] - Additional headers to merge.
   * @returns {Promise<{ok: boolean, data?: any, error?: string}>} The response wrapper matching backend structure.
   */
  async delete(url, config = {}) {
    return this._request(this._buildUrl(url), {
      method: 'DELETE',
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  /**
   * Sends a PATCH request to the specified endpoint with a JSON body.
   *
   * @param {string} url - The endpoint (relative or absolute).
   * @param {Object} [data={}] - JSON payload to send.
   * @param {Object} [config={}] - Additional overrides (e.g. extra headers).
   * @returns {Promise<{ok: boolean, data?: any, error?: string}>}
   */
  async patch(url, data = {}, config = {}) {    
    return this._request(this._buildUrl(url), {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  /**
   * Internal method to perform the actual fetch and handle response data or errors.
   * Returns the backend response directly without adding an extra wrapper layer.
   *
   * @private
   * @param {string} url - The full URL to send the request to.
   * @param {RequestInit} options - The fetch options (method, headers, body, etc.).
   * @returns {Promise<{ok: boolean, data?: any, error?: string}>} The backend response structure directly.
   * @throws {Error} Throws an AbortError if the request was canceled (e.g., via AbortController).
   */
  async _request(url, options) {
    try {
      const response = await fetch(url, options);

      // Determine if the response is JSON or plain text
      const contentType = response.headers.get('content-type');
      let backendResponse;

      if (contentType && contentType.includes('application/json')) {
        backendResponse = await response.json();
      } else {
        backendResponse = await response.text();
      }

      // If it's not a JSON response or doesn't have our standard structure,
      // wrap it to maintain consistency
      if (typeof backendResponse === 'string' || !backendResponse.hasOwnProperty('ok')) {
        return {
          ok: response.ok,
          data: backendResponse,
          error: response.ok ? undefined : `Error ${response.status}`
        };
      }

      // Return the backend response directly (it already has ok, data, error structure)
      return backendResponse;

    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('[Request aborted]');
        throw new Error('AbortError');
      }

      return {
        ok: false,
        error: 'Could not connect with server',
      };
    }
  }
}