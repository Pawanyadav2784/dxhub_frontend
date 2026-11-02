import api from './api';
import { ENDPOINTS } from '../utils/endpoints';

const returnService = {
  async createRequest(data) {
    const response = await api.post(ENDPOINTS.RETURNS.BASE, data);
    return response.data;
  },

  async getMyRequests() {
    const response = await api.get(ENDPOINTS.RETURNS.MY_REQUESTS);
    return response.data;
  },

  async cancelRequest(id) {
    const response = await api.put(`${ENDPOINTS.RETURNS.BASE}/${id}/cancel`);
    return response.data;
  },

  async getAllRequests() {
    const response = await api.get(ENDPOINTS.RETURNS.BASE);
    return response.data;
  },

  async updateStatus(id, data) {
    const response = await api.put(`${ENDPOINTS.RETURNS.BASE}/${id}/status`, data);
    return response.data;
  },

  async processRefund(id) {
    const response = await api.post(`${ENDPOINTS.RETURNS.BASE}/${id}/refund`);
    return response.data;
  },

  async processExchange(id) {
    const response = await api.post(`${ENDPOINTS.RETURNS.BASE}/${id}/exchange`);
    return response.data;
  }
};

export default returnService;
