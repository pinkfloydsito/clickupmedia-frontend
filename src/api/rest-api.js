import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? `https://clickupmedia.com/api` : `http://localhost:9000/api`;

const axiosClient = axios.create({ baseURL });

const stores = '/v1/stores'
const products = '/v1/products'
const categories = '/v1/categories'

class StoresAPI {
  static list = () => axiosClient.get(`${stores}/`)
  static get = (id) => axiosClient.get(`${stores}/${id}/`)
  static post = data => axiosClient.post(`${stores}/`, { ...data });
  static update = (id, data) => axiosClient.patch(`${stores}/${id}/`, { ...data });
  static remove = (id) => axiosClient.delete(`${stores}/${id}/`, {});
}

class ProductsAPI {
  static list = () => axiosClient.get(`${products}/`)
  static get = (id) => axiosClient.get(`${products}/${id}/`)
  static post = data => axiosClient.post(`${products}`, { ...data });
  static update = (id, data) => axiosClient.patch(`${products}/${id}/`, { ...data });
  static remove = (id) => axiosClient.delete(`${products}/${id}/`, {});
}

class CategoriesAPI {
  static list = () => axiosClient.get(`${categories}/`)
  static get = (id) => axiosClient.get(`${categories}/${id}/`)
  static post = data => axiosClient.post(`${categories}`, { ...data });
  static update = (id, data) => axiosClient.patch(`${categories}/${id}/`, { ...data });
  static remove = (id) => axiosClient.delete(`${categories}/${id}/`, {});
}

export {
  StoresAPI, ProductsAPI, CategoriesAPI,
}
