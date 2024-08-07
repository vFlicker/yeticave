import axios from 'axios';

import { BACKEND_PORT, HttpMethod } from '../constants.js';

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

  async getCategories() {
    return this.#load('/categories');
  }

  async getCategory(id) {
    return this.#load(`/categories/${id}`);
  }

  async getAllLots(params) {
    return this.#load('/lots', {
      params: params,
    });
  }

  async getLotsByCategory(id) {
    return this.#load(`/lots/categories/${id}`);
  }

  async getLotById(id) {
    return this.#load(`/lots/${id}`);
  }

  async createLot(data) {
    return this.#load('/lots', {
      method: HttpMethod.POST,
      data,
    });
  }

  async getCommentsByLotId(id) {
    return this.#load(`/lots/${id}/comments`);
  }

  async search(query) {
    return this.#load('/search', {
      params: { query },
    });
  }

  async createUser(data) {
    return this.#load('/user', {
      method: HttpMethod.POST,
      data,
    });
  }

  async auth(data) {
    return this.#load('/user/auth', {
      method: HttpMethod.POST,
      data,
    });
  }

  async #load(url, options) {
    const response = await this.#http.request({ url, ...options });
    return response.data;
  }
}

export const api = new Api(defaultUrl, TIMEOUT);
