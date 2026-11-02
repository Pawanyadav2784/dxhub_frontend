import api from './api';
import { ENDPOINTS } from '../utils/endpoints';

export const orderService = {
  async createOrder(orderData) {
    const response = await api.post(ENDPOINTS.ORDERS.BASE, orderData);
    return response.data;
  },

  async getMyOrders() {
    const response = await api.get(ENDPOINTS.ORDERS.MY_ORDERS);
    return response.data;
  },

  async getOrderById(id) {
    const response = await api.get(`${ENDPOINTS.ORDERS.BASE}/${id}`);
    return response.data;
  },

  async getInvoice(id) {
    const response = await api.get(`${ENDPOINTS.ORDERS.BASE}/${id}/invoice`);
    return response.data;
  },

  async getVendorOrders() {
    const response = await api.get(ENDPOINTS.ORDERS.VENDOR_ORDERS);
    return response.data;
  },

  async updateOrderStatus(orderId, status, shippingData = {}) {
    const response = await api.put(`${ENDPOINTS.ORDERS.BASE}/${orderId}/status`, {
      status,
      ...shippingData
    });
    return response.data;
  },

  async cancelOrder(orderId) {
    const response = await api.put(`${ENDPOINTS.ORDERS.BASE}/${orderId}/cancel`);
    return response.data;
  }
};

export default orderService;
