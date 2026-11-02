import api from './api';
import { ENDPOINTS } from '../utils/endpoints';

export const productService = {
  async getProducts(params = {}) {
    const response = await api.get(ENDPOINTS.PRODUCTS.BASE, { params });
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`${ENDPOINTS.PRODUCTS.BASE}/${id}`);
    return response.data;
  },

  async getFeaturedProducts() {
    const response = await api.get(ENDPOINTS.PRODUCTS.FEATURED);
    return response.data;
  },

  async getCategories() {
    const response = await api.get(ENDPOINTS.PRODUCTS.CATEGORIES);
    return response.data;
  },

  async createProduct(productData) {
    const response = await api.post(ENDPOINTS.PRODUCTS.BASE, productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await api.put(`${ENDPOINTS.PRODUCTS.BASE}/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`${ENDPOINTS.PRODUCTS.BASE}/${id}`);
    return response.data;
  },

  async getVendorProducts() {
    const response = await api.get(ENDPOINTS.PRODUCTS.VENDOR_PRODUCTS);
    return response.data;
  },

  async createReview(productId, reviewData) {
    const response = await api.post(`${ENDPOINTS.PRODUCTS.BASE}/${productId}/reviews`, reviewData);
    return response.data;
  }
};

export default productService;
