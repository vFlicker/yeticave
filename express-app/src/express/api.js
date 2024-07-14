import axios from 'axios';

import { BACKEND_PORT } from '../constants.js';

const TIMEOUT = 1000;

const defaultUrl = `http://localhost:${BACKEND_PORT}/api/`;

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

  getCategory(id) {
    return this.#load(`/categories/${id}`);
  }

  getAllLots() {
    return this.#load('/lots');
  }

  getLotsByCategory(id) {
    return this.#load(`/lots/categories/${id}`);
  }

  getLotById(id) {
    return this.#load(`/lots/${id}`);
  }

  createLot(data) {
    return this.#load('/lots', {
      method: 'POST',
      data,
    });
  }

  search(query) {
    return this.#load('/search', {
      params: { query },
    });
  }

  async #load(url, options) {
    const response = await this.#http.request({ url, ...options });
    return response.data;
  }
}

export const api = new Api(defaultUrl, TIMEOUT);