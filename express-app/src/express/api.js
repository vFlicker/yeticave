import axios from 'axios';

import { BACK_PORT } from '../constants.js';

const TIMEOUT = 1000;

const defaultUrl = `http://localhost:${BACK_PORT}/api/`;

export class Api {
  #http = null;

  constructor(baseURL, timeout) {
    this.#http = axios.create({
      baseURL,
      timeout,
    });
  }

  getCategories() {
    return this.#load('/categories');
  }

  async #load(url, options) {
    const response = await this.#http.request({ url, ...options });
    return response.data;
  }
}

export const defaultApi = new Api(defaultUrl, TIMEOUT);
