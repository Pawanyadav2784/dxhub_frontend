import api from './api';
import { ENDPOINTS } from '../utils/endpoints';

const shiprocketService = {
  async createOrder(orderData) {
    const response = await api.post(ENDPOINTS.SHIPROCKET.CREATE_ORDER, orderData);
    return response.data;
  },

  async schedulePickup(shipmentId, pickupDate, pickupTime) {
    const response = await api.post(ENDPOINTS.SHIPROCKET.SCHEDULE_PICKUP, {
      shipment_id: shipmentId,
      pickup_date: pickupDate,
      pickup_time: pickupTime
    });
    return response.data;
  },

  async trackByAwb(awb) {
    const response = await api.get(`${ENDPOINTS.SHIPROCKET.TRACK}/${awb}`);
    return response.data;
  },

  async trackByOrder(orderId) {
    const response = await api.get(`${ENDPOINTS.SHIPROCKET.ORDER_TRACK}/${orderId}`);
    return response.data;
  },

  async getCouriers() {
    const response = await api.get(ENDPOINTS.SHIPROCKET.COURIERS);
    return response.data;
  },

  async cancelShipment(shipmentId) {
    const response = await api.post(ENDPOINTS.SHIPROCKET.CANCEL_SHIPMENT, {
      shipment_id: shipmentId
    });
    return response.data;
  },

  async getPickupLocations() {
    const response = await api.get(ENDPOINTS.SHIPROCKET.PICKUP_LOCATIONS);
    return response.data;
  },

  async generateAwb(courierId, orderId) {
    const response = await api.post(ENDPOINTS.SHIPROCKET.GENERATE_AWB, {
      courier_id: courierId,
      order_id: orderId
    });
    return response.data;
  }
};

export default shiprocketService;